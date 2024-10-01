# Start with the official Go image
FROM golang:1.18-alpine

# Set the working directory
WORKDIR /app

# Copy the Go modules and download dependencies
COPY go.mod ./
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the Go app
RUN go build -o /user-service

# Expose the port
EXPOSE 5003

# Command to run the service
CMD ["/user-service"]
