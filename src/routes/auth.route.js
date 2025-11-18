const express = require('express');
const StatusCodes = require('../utils/statusCodes');
const {register, login} = require('../controllers/auth.controller');

const authRouter = express.Router();

// /api/auth/register
authRouter.post('/register',register);
// /api/auth/login
authRouter.post('/login', login)

module.exports = authRouter;