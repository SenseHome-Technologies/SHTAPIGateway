'use strict';
const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();
require('dotenv').config();

router.use(
    '/hubs',
    createProxyMiddleware({
        target: process.env.HUBS_API_URL,
        changeOrigin: true,
        pathRewrite: { '^/hubs': '/api/hubs' },
    })
);

module.exports = router;