from flask import Blueprint, jsonify, request
from google.cloud import firestore
import uuid
import random

# Define cart routes
cart_routes = Blueprint('cart_routes', __name__)

# Initialize Firestore client
db = firestore.Client()

# Reference to Firestore collection for carts
carts_ref = db.collection('carts')

# Helper function to get the cart by user ID
def get_cart(user_id):
    cart_doc = carts_ref.document(user_id).get()
    if cart_doc.exists:
        return cart_doc.to_dict().get('items', [])
    return []

# Route to add a product to the cart
@cart_routes.route('/cart/<string:user_id>', methods=['POST'])
def add_to_cart(user_id):
    try:
        product_data = request.json

        # Validate the incoming product data
        if not product_data.get('id') or not product_data.get('name') or not product_data.get('price'):
            return jsonify({"error": "Product must have an ID, name, and price"}), 400

        # Get the user's cart
        cart_items = get_cart(user_id)

        # Add the new product to the cart
        cart_items.append({
            'id': product_data['id'],
            'name': product_data['name'],
            'price': product_data['price'],
            'quantity': 1
        })

        # Update Firestore with the new cart
        carts_ref.document(user_id).set({'items': cart_items}, merge=True)

        return jsonify({"message": "Product added to cart"}), 201
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Route to get the cart for a user
@cart_routes.route('/cart/<string:user_id>', methods=['GET'])
def get_cart_items(user_id):
    # Simulate failure every 10 requests
    if random.random() < 0.1:
        return jsonify({"error": "Simulated failure: An error occurred while fetching products"}), 500
    try:
        # Get the user's cart items from Firestore
        cart_items = get_cart(user_id)
        return jsonify(cart_items), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

# Route to delete an item from the cart
@cart_routes.route('/cart/<string:user_id>/<string:product_id>', methods=['DELETE'])
def remove_from_cart(user_id, product_id):
    try:
        # Get the current cart items
        cart_items = get_cart(user_id)

        # Remove the product from the cart
        cart_items = [item for item in cart_items if item['id'] != product_id]

        # Update the Firestore with the updated cart
        carts_ref.document(user_id).set({'items': cart_items}, merge=True)

        return jsonify({"message": "Product removed from cart"}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500
