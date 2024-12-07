// Import dependencies
// express, a web framework for Node.js
const express = require('express');
// For interacting with the file system
const path = require('path');
// For parsing the body of incoming requests
const bodyParser = require('body-parser');

// Load environment variables
require('dotenv').config();

// Import custom modules
// Make requests to backend services
const HttpService = require('./framework/httpService');
// Forward requests to backend services
const ForwardRequest = require('./usecases/forwardrequest');
// Define routes for the gateway
const GatewayRoutes = require('./controllers/routes/gatewayRoutes');
// Create a rate limiter to prevent abuse
const createRateLimiter = require('./framework/rateLimiter');

// Create the express app
const app = express();
// Serve static files
app.use('/', express.static(path.join(__dirname, 'public')));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse application/json
app.use(bodyParser.json());

// Load services configuration
const services = JSON.parse(process.env.SERVICES);

// Create the httpService
const httpService = new HttpService(services);

// Create the forwardRequest use case
const forwardRequest = new ForwardRequest(httpService);

// Create the rate limiter
const rateLimiter = createRateLimiter(100, 15 * 60 * 1000);

// Define the routes
app.use('/', GatewayRoutes(forwardRequest, rateLimiter));

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});
