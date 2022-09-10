const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { BlogPost, Category, User, PostCategory } = require('../database/models');

const sequelize = new Sequelize(config.development);

const getUserId = async (email) => {
  const { dataValues } = await User.findOne({ where: { email } });

  return dataValues.id;
};

const validateCategory = async (categories, t) => {
  const result = await Category.findAll({ where: { id: categories }, transaction: t });

  if (result.length !== categories.length) {
    throw new Error();
  }

  return true;
};

const createPostCategory = async ({ postId, categories, t }) => {
  const data = [];

  categories.forEach((category) => data.push({ postId, categoryId: category }));

  await PostCategory.bulkCreate(
    data,
    { transaction: t },
  );
};

const createNewPost = async ({ title, content, categoryIds, userEmail }) => {
  const t = await sequelize.transaction();

  try {
    await validateCategory(categoryIds);

    const userId = await getUserId(userEmail);

    const createDate = new Date();

    const blogPostResult = await BlogPost.create(
      { title, content, userId, published: createDate, updated: createDate },
      { transaction: t },
    );

    await createPostCategory({ postId: blogPostResult.dataValues.id, categories: categoryIds, t });

    await t.commit();

    return blogPostResult;
  } catch (error) {
    await t.rollback();

    console.log(error.message);

    return { error: { code: 404, message: '"categoryIds" not found' } };
  }
};

const getAllPosts = async () => BlogPost.findAll({
  include: [
    {
      model: User,
      as: 'user',
      attributes: {
        exclude: ['password'],
      },
    },
    {
      model: Category,
      as: 'categories',
    },
  ],
});

module.exports = {
  createNewPost,
  getAllPosts,
};