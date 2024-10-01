from flask import Flask
from app.routes import cart_routes
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "DELETE"]}})
    
    # Register cart routes
    app.register_blueprint(cart_routes)
    
    return app
