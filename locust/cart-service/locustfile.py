from locust import HttpUser, task, between

class CartServiceUser(HttpUser):
    wait_time = between(1, 3)  # Simulate user wait time between requests (in seconds)

    @task
    def fetch_cart(self):
        user_id = self.get_user_id()
        self.client.get(f"/cart/{user_id}")

    def get_user_id(self):
        # Always return user_id = 1 for this test
        return "1"