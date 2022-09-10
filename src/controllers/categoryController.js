const categoryService = require('../services/categoryService');

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  const result = await categoryService.createCategory(name);

  return res.status(201).json(result);
};

module.exports = {
  create,
};