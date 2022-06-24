const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role });

  if (!existsRole) throw new Error(`Role ${role} is not register in DB`);
};

const emailExists = async (email = '') => {
  const emailExists = await User.findOne({ email });
  if (emailExists) throw new Error(`email ${email} is already exists`);
};

const userIdExists = async (id) => {
  const userExists = await User.findById(id);
  if (!userExists) throw new Error(`id ${id} not exists`);
};

module.exports = {
  isValidRole,
  emailExists,
  userIdExists,
};