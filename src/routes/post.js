const express = require('express');

const postController = require('../controllers/postController');
const postMiddleware = require('../middlewares/postMiddleware');
const authToken = require('../middlewares/authTokenMiddleware');

const postRoutes = express.Router();

postRoutes.post('/',
  postMiddleware.validatePost,
  authToken.tokenAuthValidator,
  postController.create);

module.exports = postRoutes;