'use strict';
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.use(
    '/user',
    createProxyMiddleware({
        target: process.env.USER_API_URL,
        changeOrigin: true,
        pathRewrite: { '^/user': '/api/user' },
    })
);

module.exports = router;