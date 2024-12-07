'use strict';
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.use(
    '/weather/currentWeather',
    createProxyMiddleware({
        target: process.env.EXTERNAL_API_URL,
        changeOrigin: true,
    })
);

module.exports = router;