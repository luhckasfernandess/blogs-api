const express = require('express');

const loginController = require('../controllers/loginController');
const loginValidation = require('../middlewares/loginMiddleware');

const loginRoutes = express.Router();

loginRoutes.post('/', loginValidation.validateLogin, loginController.login);

module.exports = loginRoutes;