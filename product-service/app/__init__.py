from flask import Flask
from app.routes import product_routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST"]}})
    # Register blueprints
    app.register_blueprint(product_routes)
    
    return app
