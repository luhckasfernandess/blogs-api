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

const getAll = async (req, res) => {
  try {
    const result = await userService.getAllUsers();

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await userService.getUserById(id);

    if (!result) {
      return res.status(404).json({ message: 'User does not exist' });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};