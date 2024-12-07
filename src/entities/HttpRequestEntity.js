// Exporting the HttpRequestEntity class
exports.HttpRequestEntity = class HttpRequestEntity {
    // Constructor to initialize HttpRequestEntity with an httpRequest object
    constructor(httpRequest) {
        this.service = httpRequest.service; // Service name
        this.path = httpRequest.path; // Request path
        this.method = httpRequest.method; // HTTP method (GET, POST, etc.)
        this.body = httpRequest.body; // Request body
        this.headers = httpRequest.headers; // HTTP headers
    }
}
