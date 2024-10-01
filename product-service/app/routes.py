from flask import Blueprint, jsonify, request
from google.cloud import firestore
import uuid

# Define the product routes
product_routes = Blueprint('product_routes', __name__)

# Initialize Firestore client (uses default credentials from environment)
db = firestore.Client()

# Firestore collection reference
products_ref = db.collection('products')

# Route to get all products from Firestore
@product_routes.route('/products', methods=['GET'])
def get_products():
    try:
        # Fetch all products from Firestore
        products = [doc.to_dict() for doc in products_ref.stream()]
        return jsonify(products), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred while fetching products: {str(e)}"}), 500

# Route to get a product by ID from Firestore
@product_routes.route('/products/<string:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = products_ref.document(product_id).get()

        if not product.exists:
            return jsonify({"error": "Product not found"}), 404

        return jsonify(product.to_dict()), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred while fetching the product: {str(e)}"}), 500

# Route to add a new product to Firestore
@product_routes.route('/products', methods=['POST'])
def create_product():
    try:
        product_data = request.json

        # Validate the incoming data
        if not product_data.get('name') or not product_data.get('price'):
            return jsonify({"error": "Product must have a name and a price"}), 400

        # Generate a unique ID for the product
        product_id = str(uuid.uuid4())

        # Create new product document in Firestore
        new_product_ref = products_ref.document(product_id)
        new_product_ref.set({
            'id': product_id,
            'name': product_data['name'],
            'price': product_data['price']
        })

        return jsonify({"message": "Product created successfully", "product_id": product_id}), 201
    except Exception as e:
        return jsonify({"error": f"An error occurred while creating the product: {str(e)}"}), 500

# Route to update an existing product in Firestore
@product_routes.route('/products/<string:product_id>', methods=['PUT'])
def update_product(product_id):
    try:
        product_data = request.json

        # Validate the incoming data
        if not product_data.get('name') and not product_data.get('price'):
            return jsonify({"error": "Product must have a name or a price to update"}), 400

        # Update product document in Firestore
        products_ref.document(product_id).update({
            'name': product_data.get('name', None),
            'price': product_data.get('price', None)
        })

        return jsonify({"message": "Product updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred while updating the product: {str(e)}"}), 500

# Route to delete a product from Firestore
@product_routes.route('/products/<string:product_id>', methods=['DELETE'])
def delete_product(product_id):
    try:
        product_ref = products_ref.document(product_id)

        # Check if the product exists
        if not product_ref.get().exists:
            return jsonify({"error": "Product not found"}), 404

        product_ref.delete()
        return jsonify({"message": "Product deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred while deleting the product: {str(e)}"}), 500
