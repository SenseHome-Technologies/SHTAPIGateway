const fetch = require('node-fetch');

// Class for making requests to backend services
class HttpService {
    // Services is an object that maps service names to base URLs
    constructor(services) {
        this.services = services;
    }

    // Make a request to the specified service and path
    async request({ service, path, method, body, headers }) {
        const baseURL = this.services[service];
        if (!baseURL) {
            throw new Error(`Service ${service} is not configured.`);
        }

        // If the path includes api-doc, don't append api/
        const url = path.includes('api-doc') ? `${baseURL}${path}` : `${baseURL}api/${path}`;

        const options = {
            method,
            headers,
            body: ['GET', 'HEAD'].includes(method) ? null : JSON.stringify(body),
        };

        try {
            const response = await fetch(url, options);

            // Handle non-200 responses gracefully
            if (!response.ok) {
                // Get the error message from the response
                const errorBody = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorBody}`);
            }

            // If the path includes api-doc, return it as a string
            // Otherwise, parse the response as JSON
            const data = path.includes('api-doc') ? (await response.text()).replaceAll("./", `${baseURL}${path}/`) : await response.json();
            return data;
        } catch (error) {
            // Re-throw any errors
            throw error;
        }
    }
}

// Export the HttpService class
module.exports = HttpService;

