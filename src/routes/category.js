const express = require('express');

const categoryController = require('../controllers/categoryController');
const authToken = require('../middlewares/authTokenMiddleware');

const categoriesRoutes = express.Router();

categoriesRoutes.get('/', authToken.tokenAuthValidator, categoryController.getAll);
categoriesRoutes.post('/', authToken.tokenAuthValidator, categoryController.create);

module.exports = categoriesRoutes;