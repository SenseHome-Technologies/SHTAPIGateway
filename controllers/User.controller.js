'use strict'
const userService = require('../services/userService');

const getUsers = async (req, res) => {
    try {
        const users = await userService.listUsers();
        res.send(users);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}