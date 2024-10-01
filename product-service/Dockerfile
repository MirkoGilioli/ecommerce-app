# Use the official Python image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements.txt and install the dependencies
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

# Copy the current directory content into the container at /app
COPY . .

# Expose port 5001 (since Flask runs on this port)
EXPOSE 5001

# Command to run the app
CMD ["python", "main.py"]
