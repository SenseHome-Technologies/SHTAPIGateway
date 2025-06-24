const fetch = require('node-fetch');

// Class for making requests to backend services
class HttpService {
    // Services is an object that maps service names to base URLs
    constructor(services) {
        this.services = services;
    }

    // Make a request to the specified service and path
    async request({ service, path, method, body, headers, query }) {
        const baseURL = this.services[service];
        if (!baseURL) {
            throw new Error(`Service ${service} is not configured.`);
        }

        // Build query string if query object exists
        let queryString = '';
        if (query && typeof query === 'object') {
            const params = new URLSearchParams(query);
            queryString = `?${params.toString()}`;
        }

        // If the path includes api-doc, don't append api/
        const isApiDoc = path.includes('api-doc');
        const fullPath = isApiDoc ? `${baseURL}${path}` : `${baseURL}api/${path}`;
        const url = `${fullPath}${queryString}`;

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
                const errorBody = await response.json();
                return {status: errorBody.status, message: errorBody.message};
            }

            // If the path includes api-doc, return it as a string
            // Otherwise, parse the response as JSON
            const data = path.includes('api-doc') ? (await response.text()).replaceAll("./", `${baseURL}${path}/`) : await response.json();

            return data;
        } catch (error) {
            // Re-throw any errors
            return {status: 500, message: error.message};
        }
    }
}

// Export the HttpService class
module.exports = HttpService;

