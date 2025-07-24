variable "resource_group_name" {
  description = "The name of the Azure Resource Group."
  type        = string
  default     = "subtrack-rg"
}

variable "location" {
  description = "The Azure region to deploy resources in."
  type        = string
  default     = "westus3"
}

variable "project_name" {
  description = "A short name for project resource naming."
  type        = string
  default     = "subtrack"
} 

variable "db_admin_username" {
  description = "PostgreSQL admin username"
  type        = string
  default     = "psqladmin"
}

variable "db_admin_password" {
  description = "PostgreSQL admin password"
  type        = string
  default     = "SuperSecurePassword123!" # Change this!
  sensitive   = true
}

