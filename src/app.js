const express = require('express');
const rateLimiter = require('./middleware/rateLimiter');
require('dotenv').config()

const app = express();

// Apply rate limiting globally
app.use(rateLimiter);

app.use('/', require('./controllers/routes/userRoute'));
app.use('/', require('./controllers/routes/hubRoute'));
app.use('/', require('./controllers/routes/externalRoute'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway running on http://localhost:${PORT}`);
});