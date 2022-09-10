require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const userService = require('../services/userService');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const getUser = await userService.getUser({ email, password });

    if (getUser.error) {
      return res.status(getUser.error.code).json({ message: getUser.error.message });
    }

    const token = jwt.sign({ email }, JWT_SECRET);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  login,
};