// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Using environment variables for the User and Order Service URLs
  const USER_SERVICE_URL = process.env.REACT_APP_USER_SERVICE_URL;
  const ORDER_SERVICE_URL = process.env.REACT_APP_ORDER_SERVICE_URL;

  useEffect(() => {
    // Fetch user profile from the User Service
    axios.get(`${USER_SERVICE_URL}/users/1`) // Assuming user ID 1 for demo
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching user profile!", error);
      });

    // Fetch orders from the Order Service
    axios.get(`${ORDER_SERVICE_URL}/orders`)
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching order history!", error);
      });
  }, [USER_SERVICE_URL, ORDER_SERVICE_URL]);

  return (
    <div className="container">
      <h1>User Profile</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}

      <h2>Order History</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>
            Order {index + 1}: Product ID {order.product_id}, Quantity: {order.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
