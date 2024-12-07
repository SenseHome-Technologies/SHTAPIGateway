// express-rate-limit is a middleware to limit repeated requests to public APIs and/or endpoints such as password reset.
// Complete documentation is available on https://www.npmjs.com/package/express-rate-limit
const rateLimit = require('express-rate-limit');

// Create a rate limiter with the specified number of max requests and window size.
// The rate limiter will return an error if the number of requests exceeds the maximum allowed.
const createRateLimiter = (maxRequests, windowMs) => rateLimit({
    windowMs,
    max: maxRequests,
    message: { error: 'Too many requests, please try again later.' },
});

// Export the function to create a rate limiter.
module.exports = createRateLimiter;

