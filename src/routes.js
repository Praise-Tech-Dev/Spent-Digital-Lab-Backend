const express = require('express');
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');

const appRouter = express.Router();

// /api/auth
appRouter.use('/auth', authRouter);

// /api/users
appRouter.use('/users', usersRouter);

module.exports = appRouter;