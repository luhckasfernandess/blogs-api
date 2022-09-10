const { User } = require('../database/models');

const getUser = async ({ email, password }) => {
  const result = await User.findOne({
    where: {
      email,
      password,
    },
  });

  if (!result) {
    return { error: { code: 400, message: 'Invalid fields' } };
  }

  return true;
};

module.exports = {
  getUser,
};