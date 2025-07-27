terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
  required_version = ">= 1.0"
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
}

resource "azurerm_container_registry" "main" {
  name                = "${var.project_name}acr${random_integer.suffix.result}"
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  sku                 = "Basic"
  admin_enabled       = true
}

resource "random_integer" "suffix" {
  min = 10000
  max = 99999
}

resource "azurerm_postgresql_flexible_server" "main" {
  name                   = "${var.project_name}-psql"
  resource_group_name    = azurerm_resource_group.main.name
  location               = azurerm_resource_group.main.location
  version                = "13"
  administrator_login    = "psqladmin"
  administrator_password = "SuperSecurePassword123!" # Change this to a strong password!
  storage_mb             = 32768
  sku_name               = "B_Standard_B1ms"
  backup_retention_days  = 7
  geo_redundant_backup_enabled = false
  zone                   = "1"

  authentication {
    password_auth_enabled = true
  }
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure_services" {
  name                = "AllowAzureServices"
  server_id           = azurerm_postgresql_flexible_server.main.id
  start_ip_address    = "0.0.0.0"
  end_ip_address      = "0.0.0.0"
}

# Application Insights for Monitoring
resource "azurerm_application_insights" "main" {
  name                = "${var.project_name}-insights"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  application_type    = "web"
}

# Action Group for Alerts
resource "azurerm_monitor_action_group" "main" {
  name                = "${var.project_name}-action-group"
  resource_group_name = azurerm_resource_group.main.name
  short_name          = "subtrack"
}

# Metric Alert for Backend Memory Usage
resource "azurerm_monitor_metric_alert" "backend_memory_alert" {
  name                = "${var.project_name}-backend-memory-alert"
  resource_group_name = azurerm_resource_group.main.name
  scopes               = [azurerm_app_service.backend.id]
  description          = "Alert when backend memory usage is high"

  criteria {
    metric_namespace = "Microsoft.Web/sites"
    metric_name      = "MemoryPercentage"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 80
  }

  action {
    action_group_id = azurerm_monitor_action_group.main.id
  }
}

# Metric Alert for Frontend Memory Usage
resource "azurerm_monitor_metric_alert" "frontend_memory_alert" {
  name                = "${var.project_name}-frontend-memory-alert"
  resource_group_name = azurerm_resource_group.main.name
  scopes               = [azurerm_app_service.frontend.id]
  description          = "Alert when frontend memory usage is high"

  criteria {
    metric_namespace = "Microsoft.Web/sites"
    metric_name      = "MemoryPercentage"
    aggregation      = "Average"
    operator         = "GreaterThan"
    threshold        = 80
  }

  action {
    action_group_id = azurerm_monitor_action_group.main.id
  }
}

resource "azurerm_app_service_plan" "main" {
  name                = "${var.project_name}-plan"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = "Basic"
    size = "B1"
  }
}

resource "azurerm_app_service" "backend" {
  name                = "${var.project_name}-backend"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id

  site_config {
    linux_fx_version = "DOCKER|${azurerm_container_registry.main.login_server}/${var.project_name}-backend:v2"
  }

  app_settings = {
    WEBSITES_PORT                  = "8181"
    DOCKER_REGISTRY_SERVER_URL      = "https://${azurerm_container_registry.main.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.main.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.main.admin_password
    # Add your backend environment variables here, e.g. DB connection string
  }
}

resource "azurerm_app_service" "frontend" {
  name                = "${var.project_name}-frontend"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id

  site_config {
    linux_fx_version = "DOCKER|${azurerm_container_registry.main.login_server}/${var.project_name}-frontend:latest"
  }

  app_settings = {
    WEBSITES_PORT                  = "80"
    DOCKER_REGISTRY_SERVER_URL      = "https://${azurerm_container_registry.main.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.main.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.main.admin_password
    # Add any frontend environment variables here
  }
}

# Staging Environment
resource "azurerm_app_service" "backend_staging" {
  name                = "${var.project_name}-backend-staging"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id

  site_config {
    linux_fx_version = "DOCKER|${azurerm_container_registry.main.login_server}/${var.project_name}-backend:staging"
  }

  app_settings = {
    WEBSITES_PORT                  = "8181"
    DOCKER_REGISTRY_SERVER_URL      = "https://${azurerm_container_registry.main.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.main.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.main.admin_password
    # Add your backend environment variables here, e.g. DB connection string
  }
}

resource "azurerm_app_service" "frontend_staging" {
  name                = "${var.project_name}-frontend-staging"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  app_service_plan_id = azurerm_app_service_plan.main.id

  site_config {
    linux_fx_version = "DOCKER|${azurerm_container_registry.main.login_server}/${var.project_name}-frontend:staging"
  }

  app_settings = {
    WEBSITES_PORT                  = "80"
    DOCKER_REGISTRY_SERVER_URL      = "https://${azurerm_container_registry.main.login_server}"
    DOCKER_REGISTRY_SERVER_USERNAME = azurerm_container_registry.main.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD = azurerm_container_registry.main.admin_password
    # Add any frontend environment variables here
  }
}