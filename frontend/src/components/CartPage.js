// src/components/CartPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userId = "1";  // Mocked user ID, you can dynamically set this in a real-world scenario

  // Using the environment variable for the Cart Service URL
  const CART_SERVICE_URL = process.env.REACT_APP_CART_SERVICE_URL;

  useEffect(() => {
    // Fetch cart items from the cart-service
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${CART_SERVICE_URL}/cart/${userId}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [CART_SERVICE_URL, userId]);

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`${CART_SERVICE_URL}/cart/${userId}/${productId}`);
      setCartItems(cartItems.filter(item => item.id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  if (cartItems.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
