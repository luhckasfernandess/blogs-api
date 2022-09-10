const express = require('express');

const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userMiddleware');
const authToken = require('../middlewares/authTokenMiddleware');

const userRoutes = express.Router();

userRoutes.post('/', userValidation.validateUser, userController.create);
userRoutes.get('/', authToken.tokenAuthValidator, userController.getAll);
userRoutes.get('/:id', authToken.tokenAuthValidator, userController.getById);
userRoutes.delete('/me', authToken.tokenAuthValidator, userController.removeSelf);

module.exports = userRoutes;