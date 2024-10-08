# Define variables
PROJECT_ID=<YOUR PROJECT HERE>
LOCATION=us-west1
TAG=latest

# Define the services for which to build Locust images
SERVICES=cart-service product-service order-service user-service frontend-service

# Default target: build and push all Locust images
all: build push

# Step to build Locust images for all services
build:
	@echo "Building Locust images for all services..."
	@for service in $(SERVICES); do \
		IMAGE_NAME=${LOCATION}-docker.pkg.dev/$(PROJECT_ID)/locust/$$service; \
		echo "Building image for $$service..."; \
		docker build -t $$IMAGE_NAME ./$$service; \
	done

# Step to push Locust images for all services
push:
	@echo "Pushing Locust images to registry..."
	@for service in $(SERVICES); do \
		IMAGE_NAME=${LOCATION}-docker.pkg.dev/$(PROJECT_ID)/locust/$$service; \
		echo "Pushing image for $$service..."; \
		docker push $$IMAGE_NAME; \
	done

# Clean up Locust images (optional)
clean:
	@echo "Cleaning up Locust images..."
	@for service in $(SERVICES); do \
		IMAGE_NAME=${LOCATION}-docker.pkg.dev/$(PROJECT_ID)/locust/$$service; \
		docker rmi $$IMAGE_NAME:$(TAG) || true; \
	done
