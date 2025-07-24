output "resource_group_name" {
  description = "The name of the resource group."
  value       = var.resource_group_name
}

output "location" {
  description = "The Azure region used."
  value       = var.location
} 

output "acr_login_server" {
  description = "The login server of the Azure Container Registry."
  value       = azurerm_container_registry.main.login_server
}

output "postgresql_fqdn" {
  description = "The FQDN of the PostgreSQL server."
  value       = azurerm_postgresql_flexible_server.main.fqdn
}