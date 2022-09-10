const { Category } = require('../database/models');

const createCategory = async (name) => Category.create({ name });

const getAllCategories = async () => Category.findAll();
module.exports = {
  createCategory,
  getAllCategories,
};