variable "project_id" {
  description = "The Google Cloud project ID"
  type        = string
}

variable "location" {
  description = "The location for the repositories (e.g., us-central1)"
  type        = string
}

variable "firestore_location" {
  description = "The location/region for Firestore"
  type        = string
}

variable "backends" {
  description = "List of backend names for which containers will be created"
  type        = list(string)
  default     = ["order-service", "cart-service", "product-service", "user-service"]
}

# Define the ports for each microservice
variable "service_ports" {
  type = map(number)
  default = {
    "user-service"    = 5003
    "product-service" = 5001
    "order-service"   = 5002
    "cart-service"    = 5004
  }
}