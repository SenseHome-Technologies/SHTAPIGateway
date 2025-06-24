const express = require('express');
const { HttpRequestEntity } = require('../../entities/HttpRequestEntity');

// Function to define gateway routes
const GatewayRoutes = (forwardRequest, rateLimiter) => {
    const router = express.Router();

    // Handle all requests to any service endpoint
    router.all('/:service/*', rateLimiter, async (req, res) => {
        const { service } = req.params; // Extract service name from URL
        const path = req.params[0]; // Extract remaining path after service
        const { method, body, headers, query } = req; // Extract method, body, and headers from request

        // Handle request aborts
        req.on('aborted', () => {
            return res.status(400).json({ error: 'Request aborted' });
        });

        try {
            // Create a new HttpRequestEntity instance
            const httpRequest = new HttpRequestEntity({ service, path, method, body, headers, query });

            // Execute the request via forwardRequest use case
            const result = await forwardRequest.execute(httpRequest);

            // Determine response based on path
            if (path.includes('api-doc')) {
                res.set('Content-Type', 'text/html');
                res.send(result); // Send as HTML if path includes 'api-doc'
            } else {
                res.status(result.status).send(result); // Send as JSON for other paths
            }
        } catch (error) {
            // Handle errors by sending a 500 response
            res.status(500).json({ error: error.message });
        }
    });

    return router; // Return the configured router
};

module.exports = GatewayRoutes;
