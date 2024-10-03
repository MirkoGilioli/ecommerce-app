from locust import HttpUser, TaskSet, task, between
import random
import json


class UserServiceUser(HttpUser):

    wait_time = between(1, 5)  # Simulate wait times between requests

    def on_start(self):
        """Executed when a user starts a test session"""
    
    @task(1)
    def get_users(self):
        """Simulate fetching all users"""
        with self.client.get("/users", catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Failed to fetch users. Status code: {response.status_code}")

    @task(2)
    def get_user_by_id(self):
        """Simulate fetching a user by ID"""
        # Fetch a random user ID for testing. In a real-world test, you'd query an existing list of users.
        user_id = random.randint(1, 3)  # Assuming there are 10 users; adjust this based on your actual data.
        with self.client.get(f"/users/{user_id}", catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Failed to fetch user by ID {user_id}. Status code: {response.status_code}")
