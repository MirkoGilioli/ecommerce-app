# Define variables
IMAGE_NAME=<MUST BE FILLED WITH THE FRONTEND ARTIFACT REPO NAME>
TAG=latest
ENV_FILE=.env

# Default target: build and push the Docker image
all: update_env build push

# Step to backfill backend URLs in the .env file
update_env:
	@echo "Updating backend URLs in .env file..."
	@SERVICES="cart-service product-service order-service user-service"; \
	for service in $$SERVICES; do \
	  URL=$$(gcloud run services list --filter="$$service" --format="value(URL)"); \
	  if [ "$$service" = "cart-service" ]; then \
	    sed -i "s|^REACT_APP_CART_SERVICE_URL=.*|REACT_APP_CART_SERVICE_URL=$${URL}|" $(ENV_FILE); \
	  elif [ "$$service" = "product-service" ]; then \
	    sed -i "s|^REACT_APP_PRODUCT_SERVICE_URL=.*|REACT_APP_PRODUCT_SERVICE_URL=$${URL}|" $(ENV_FILE); \
	  elif [ "$$service" = "order-service" ]; then \
	    sed -i "s|^REACT_APP_ORDER_SERVICE_URL=.*|REACT_APP_ORDER_SERVICE_URL=$${URL}|" $(ENV_FILE); \
	  elif [ "$$service" = "user-service" ]; then \
	    sed -i "s|^REACT_APP_USER_SERVICE_URL=.*|REACT_APP_USER_SERVICE_URL=$${URL}|" $(ENV_FILE); \
	  fi; \
	done
	@echo ".env file updated."

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
