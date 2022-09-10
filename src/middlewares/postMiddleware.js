const Joi = require('joi');

const validateData = (body) => Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
}).validate(body);

const validatePost = async (req, res, next) => {
  const { error } = validateData(req.body);

  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

const validateUpdate = (body) => Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).validate(body);

const validatePut = async (req, res, next) => {
  const { error } = validateUpdate(req.body);

  if (error) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  return next();
};

module.exports = {
  validatePost,
  validatePut,
};