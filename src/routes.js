const express = require('express');
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');
const adminRouter = require('./admin/admin.routers');

const appRouter = express.Router();

// /api/auth
appRouter.use('/auth', authRouter);

// /api/users
appRouter.use('/users', usersRouter);

appRouter.use('/admin', adminRouter);

module.exports = appRouter;