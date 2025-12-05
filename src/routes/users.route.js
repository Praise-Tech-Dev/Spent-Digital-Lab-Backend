const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const { uploadAvatar, getMe, updateProfile, GetPublication, GetSinglePublication } = require('../controllers/user.controller');

const usersRouter = express.Router();

usersRouter.post('/upload-avatar', authMiddleware, upload.single('avatar'), uploadAvatar);

usersRouter.get('/me', authMiddleware, getMe);

usersRouter.put('/me', authMiddleware, updateProfile);

usersRouter.get('/publications', GetPublication);

usersRouter.get('/publications/:publicationId', GetSinglePublication);

module.exports = usersRouter;