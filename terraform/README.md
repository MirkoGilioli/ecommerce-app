# Terraform Setup for Google Artifact Registry Repositories

This Terraform setup creates Docker repositories in Google Artifact Registry for the following microservices:
- frontend
- order-service
- cart-service
- product-service
- user-service

## Setup

1. Ensure you have the following installed:
    - [Terraform](https://www.terraform.io/downloads.html)
    - [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)

2. Authenticate with Google Cloud:
   ```bash
   gcloud auth application-default login
