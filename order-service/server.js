const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./app/routes/orderRoutes');
const { Firestore } = require('@google-cloud/firestore');
const cors = require('cors');

// Create an instance of the Express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Initialize Firestore
const firestore = new Firestore();

// Enable CORS
app.use(cors({
    origin: '*', // Allow all origins, can be restricted to specific domains if needed
    methods: ['GET', 'POST'],
}));

// Register the order routes and pass Firestore instance
app.use('/', orderRoutes(firestore));

// Set the port
const PORT = process.env.PORT || 5002;

// Start the server
app.listen(PORT, () => {
    console.log(`Order service running on port ${PORT}`);
});
