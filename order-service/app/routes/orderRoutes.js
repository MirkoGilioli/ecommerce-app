const express = require('express');
const router = express.Router();

// Export the order routes as a function that accepts the Firestore instance
module.exports = (firestore) => {

    // Initialize a request counter
    let requestCounter = 0;

    // GET: Fetch all orders
    router.get('/orders', async (req, res) => {
        // Increment the request counter
        requestCounter++;
        // Simulate failure every 10 requests
        if (requestCounter % 10 === 0) {
            console.error('Simulated failure: Error fetching orders');
            return res.status(500).send('Simulated failure: Error fetching orders');
        }
        try {
            const snapshot = await firestore.collection('orders').get();
            const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error fetching orders:', error);
            res.status(500).send('Error fetching orders');
        }
    });

    // POST: Create a new order
    router.post('/orders', async (req, res) => {
        try {
            const newOrder = req.body;
            const orderRef = await firestore.collection('orders').add(newOrder);
            res.status(201).json({ id: orderRef.id, ...newOrder });
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).send('Error creating order');
        }
    });

    return router;
};
