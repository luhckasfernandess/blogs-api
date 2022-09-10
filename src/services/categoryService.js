const { Category } = require('../database/models');

const createCategory = async (name) => Category.create({ name });

module.exports = {
  createCategory,
};