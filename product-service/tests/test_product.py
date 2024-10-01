import unittest
from app import create_app

class ProductServiceTest(unittest.TestCase):

    def setUp(self):
        # Create the test app and client
        self.app = create_app()
        self.client = self.app.test_client()

    def test_get_products(self):
        # Test the /products endpoint
        response = self.client.get('/products')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.json) > 0)

    def test_get_product_by_id(self):
        # Test getting a product by its ID
        response = self.client.get('/products/1')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['name'], 'Laptop')

    def test_get_product_not_found(self):
        # Test getting a product that doesn't exist
        response = self.client.get('/products/999')
        self.assertEqual(response.status_code, 404)

if __name__ == '__main__':
    unittest.main()
