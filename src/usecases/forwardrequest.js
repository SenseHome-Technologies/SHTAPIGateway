class ForwardRequest {
    // Initialize with an instance of HttpService
    constructor(httpService) {
        this.httpService = httpService;
    }

    // Execute the request using the httpService
    async execute(httpRequest) {
        const { service, path, method, body, headers } = httpRequest;
        return this.httpService.request({ service, path, method, body, headers });
    }
}

// Export the ForwardRequest class
module.exports = ForwardRequest;
