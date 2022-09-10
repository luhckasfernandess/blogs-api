const express = require('express');

const postController = require('../controllers/postController');
const postMiddleware = require('../middlewares/postMiddleware');
const authToken = require('../middlewares/authTokenMiddleware');

const postRoutes = express.Router();

postRoutes.get('/', authToken.tokenAuthValidator, postController.getAll);
postRoutes.get('/:id', authToken.tokenAuthValidator, postController.getById);

postRoutes.post('/',
  postMiddleware.validatePost,
  authToken.tokenAuthValidator,
  postController.create);

postRoutes.put('/:id',
  postMiddleware.validatePut,
  authToken.tokenAuthValidator,
  postController.update);

postRoutes.delete('/:id', authToken.tokenAuthValidator, postController.remove);

module.exports = postRoutes;