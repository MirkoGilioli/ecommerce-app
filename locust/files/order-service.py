from locust import HttpUser, TaskSet, task, between
import random
import json


class OrderServiceUser(HttpUser):

    @task(1)
    def get_orders(self):
        """Simulate fetching all orders"""
        with self.client.get("/orders", catch_response=True) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Failed to fetch orders. Status code: {response.status_code}")

    @task(2)
    def create_order(self):
        """Simulate creating a new order"""
        products = ["001", "002", "003"]
        new_order = {
            "id": random.sample(products, 1),  # Select one random product from the list
            "quantity": random.randint(1,5)  # Simulating a quantity between 1 to 5
        }

        with self.client.post("/orders", json=new_order, catch_response=True) as response:
            if response.status_code == 201:
                response.success()
            else:
                response.failure(f"Failed to create order. Status code: {response.status_code}")