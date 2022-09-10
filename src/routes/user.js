const express = require('express');

const userController = require('../controllers/userController');
const userValidation = require('../middlewares/userMiddleware');

const userRoutes = express.Router();

userRoutes.post('/', userValidation.validateUser, userController.create);

module.exports = userRoutes;