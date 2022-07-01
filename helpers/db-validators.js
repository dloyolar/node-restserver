const { isValidObjectId } = require('mongoose');
const { Category, Role, User, Product } = require('../models');

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

const categoryExists = async (id) => {
  const category = await Category.findById(id);
  if (!category) throw new Error(`category ${id} is not register in DB`);
};

const categoryNameExists = async (name) => {
  const nameDB = name.toUpperCase();
  const category = await Category.findOne({ name: nameDB });
  if (category) throw new Error(`category ${name} is already exists`);
};

const categoryDisabled = async (id) => {
  const category = await Category.findById(id);
  if (!category.status) {
    throw new Error(`category ${id} is deleted or disabled`);
  }
};

const productExists = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new Error(`product ${id} is not register in DB`);
};

const productNameExists = async (name) => {
  const nameDB = name.toUpperCase();
  const product = await Product.findOne({ name: nameDB });
  if (product) throw new Error(`product ${name} is already exists`);
};

const productDisabled = async (id) => {
  const product = await Product.findById(id);
  if (!product.status) {
    throw new Error(`product ${id} is deleted or disabled`);
  }
};

module.exports = {
  isValidRole,
  emailExists,
  userIdExists,
  categoryExists,
  categoryNameExists,
  categoryDisabled,
  productExists,
  productNameExists,
  productDisabled,
};
