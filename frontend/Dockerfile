# Use an official Node.js image as the base image for building the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Inject environment variables at build time
ARG REACT_APP_PRODUCT_SERVICE_URL
ARG REACT_APP_CART_SERVICE_URL
ARG REACT_APP_ORDER_SERVICE_URL
ARG REACT_APP_USER_SERVICE_URL

# Build the React application
RUN npm run build

# Use an Nginx image to serve the static files
FROM nginx:alpine

# Copy the build folder from the previous stage to Nginx's html folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
