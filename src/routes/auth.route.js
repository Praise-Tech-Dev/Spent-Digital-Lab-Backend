const express = require('express');
const StatusCodes = require('../utils/statusCodes');
const register = require('../controllers/auth.controller');

const authRouter = express.Router();

// /api/auth/register
authRouter.post('/register',register);

module.exports = authRouter;