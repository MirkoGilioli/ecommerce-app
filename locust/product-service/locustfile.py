from locust import HttpUser, TaskSet, task, between
import random
import json


class ProductServiceUser(HttpUser):
    
    product_ids = list()
    
    def on_start(self):
        self.product_ids = []

    @task(1)
    def get_all_products(self):
        """Simulate fetching all products"""
        with self.client.get("/products", catch_response=True) as response:
            if response.status_code == 200:
                products = response.json()
                self.product_ids = [product['id'] for product in products]  # Store product IDs for further use
                response.success()
            else:
                response.failure(f"Failed to fetch products. Status code: {response.status_code}")

    @task(2)
    def get_product_by_id(self):
        """Simulate fetching a product by its ID"""
        if not self.product_ids:
            self.get_all_products()  # Fetch all products if no product IDs are available
        if self.product_ids:
            product_id = random.choice(self.product_ids)
            with self.client.get(f"/products/{product_id}", catch_response=True) as response:
                if response.status_code == 200:
                    response.success()
                else:
                    response.failure(f"Failed to fetch product by ID. Status code: {response.status_code}")

    # @task(3)
    # def create_product(self):
    #     """Simulate creating a new product"""
    #     product_data = {
    #         "name": f"Apple iPhone {random.randint(1, 15)}",
    #         "price": random.randint(50, 1000)
    #     }
    #     with self.client.post("/products", json=product_data, catch_response=True) as response:
    #         if response.status_code == 201:
    #             product_id = response.json().get("product_id")
    #             self.product_ids.append(product_id)
    #             response.success()
    #         else:
    #             response.failure(f"Failed to create product. Status code: {response.status_code}")

    # @task(4)
    # def delete_product(self):
    #     """Simulate deleting a product"""
    #     if not self.product_ids:
    #         self.get_all_products()  # Fetch all products if no product IDs are available
    #     if self.product_ids:
    #         product_id = random.choice(self.product_ids)
    #         with self.client.delete(f"/products/{product_id}", catch_response=True) as response:
    #             if response.status_code == 200:
    #                 self.product_ids.remove(product_id)  # Remove the product ID from the list
    #                 response.success()
    #             else:
    #                 response.failure(f"Failed to delete product. Status code: {response.status_code}")