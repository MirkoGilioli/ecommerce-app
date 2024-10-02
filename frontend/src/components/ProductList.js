import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const ProductList = () => {
  const [products, setProducts] = useState([]); // State to hold the list of products
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State to capture errors
  const userId = "1";  // Mocked user ID, replace with real ID

  // Using environment variable for Service URLs
  const PRODUCT_SERVICE_URL = process.env.REACT_APP_PRODUCT_SERVICE_URL;
  const CART_SERVICE_URL = process.env.REACT_APP_CART_SERVICE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${PRODUCT_SERVICE_URL}/products`);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching products');
        setLoading(false);
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [PRODUCT_SERVICE_URL]); // Fetch products when the component mounts

  const handleAddToCart = async (product) => {
    try {
      await axios.post(`${CART_SERVICE_URL}/cart/${userId}`, {
        id: product.id,
        name: product.name,
        price: product.price
      });
      alert('Product added to cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (loading) {
    return <p>Loading products...</p>; // Show a loading indicator
  }

  if (error) {
    return <p>{error}</p>; // Show an error message if fetching fails
  }

  return (
    <div className="product-list">
      {products.length > 0 ? (
        products.map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
