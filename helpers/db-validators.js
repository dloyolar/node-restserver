const Role = require('../models/role');

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role });

  if (!existsRole) throw new Error(`Role ${role} is not register in DB`);
};

module.exports = {
  isValidRole,
};
