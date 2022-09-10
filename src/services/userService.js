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

const validateUserEmail = async (email) => User.findOne({
  where: {
    email,
  },
});

const createUser = async ({ displayName, email, password, image }) => {
  const isEmailAlreadyInUse = await validateUserEmail(email);

  if (isEmailAlreadyInUse) {
    return { error: { code: 409, message: 'User already registered' } };
  }

  await User.create({ displayName, email, password, image });

  return {};
};

module.exports = {
  getUser,
  createUser,
};