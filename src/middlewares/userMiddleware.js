const Joi = require('joi');

const validateData = (body) => Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
}).validate(body);

const validateUser = (req, res, next) => {
  const { error } = validateData(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  return next();
};

module.exports = {
  validateUser,
};