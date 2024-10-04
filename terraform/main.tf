# Terraform provider configuration
provider "google" {
  project = var.project_id
  region  = var.location
}

# Create Docker repositories for each backend microservice
resource "google_artifact_registry_repository" "docker_repos" {
  count         = length(var.backends)
  location      = var.location
  repository_id = var.backends[count.index]
  description   = "Docker repository for ${var.backends[count.index]}"
  format        = "docker"
}

# Create Docker repository for the frontend microservice
resource "google_artifact_registry_repository" "frontend_repos" {
  location      = var.location
  repository_id = "frontend"
  description   = "Docker repository for frontend"
  format        = "docker"
}

# Enable Cloud Run API
resource "google_project_service" "cloud_run_api" {
  project = var.project_id
  service = "run.googleapis.com"
}

# Firestore database
resource "google_firestore_database" "database" {
  project     = var.project_id
  name        = "(default)"
  location_id = var.firestore_location
  type        = "FIRESTORE_NATIVE"
}

# Build and Push Docker images for backend microservices
resource "null_resource" "build_and_push_backends" {
  for_each = toset(var.backends)

  provisioner "local-exec" {
    command = <<EOT
      docker build -t ${var.location}-docker.pkg.dev/${var.project_id}/${each.value}/${each.key} ../${each.key}
      docker push ${var.location}-docker.pkg.dev/${var.project_id}/${each.value}/${each.key}
    EOT
  }
  # Ensure build happens after repository creation
  depends_on = [google_artifact_registry_repository.docker_repos]
}

# Deploy backend microservices to Cloud Run
resource "google_cloud_run_service" "backend_services" {
  for_each = toset(var.backends)

  name     = each.key
  location = var.location

  template {
    spec {
      containers {
        image = "${var.location}-docker.pkg.dev/${var.project_id}/${each.value}/${each.key}"
        resources {
          limits = {
            memory = "512Mi"
            cpu    = "1"
          }
        }
        ports {
          container_port = var.service_ports[each.key]
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [null_resource.build_and_push_backends]
  autogenerate_revision_name = true
}

# Allow unauthenticated access to each service
resource "google_cloud_run_service_iam_member" "noauth" {
  for_each = toset(var.backends)

  service  = google_cloud_run_service.backend_services[each.key].name
  location = var.location
  role     = "roles/run.invoker"
  member   = "allUsers"
  depends_on = [ google_cloud_run_service.backend_services ]
}
