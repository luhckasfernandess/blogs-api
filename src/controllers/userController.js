require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const userService = require('../services/userService');

const create = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const result = await userService.createUser({ displayName, email, password, image });

    if (result.error) {
      return res.status(result.error.code).json({ message: result.error.message });
    }

    const token = jwt.sign({ email }, JWT_SECRET);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  create,
};