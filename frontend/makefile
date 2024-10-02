# Define variables
IMAGE_NAME=us-west1-docker.pkg.dev/qwiklabs-gcp-00-1ddbfdcba627/ecommerce-repo/frontend-service
TAG=latest
ENV_FILE=.env

# Default target: build and push the Docker image
all: build push

# Read environment variables from .env file and build the Docker image
build:
	@echo "Building Docker image..."
	docker build $(shell cat $(ENV_FILE) | sed 's/^/--build-arg /') -t $(IMAGE_NAME):$(TAG) .

# Push the Docker image to the container registry
push:
	@echo "Pushing Docker image to registry..."
	docker push $(IMAGE_NAME):$(TAG)

# Clean up the Docker image (optional)
clean:
	@echo "Cleaning up Docker image..."
	docker rmi $(IMAGE_NAME):$(TAG)
