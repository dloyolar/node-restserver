const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const usersGet = (req, res = response) => {
  const { name = 'no name', page = 1, limit } = req.query;
  res.json({
    msg: 'get API - usersGet',
    name,
    page,
    limit,
  });
};

const usersPost = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // save
  await user.save();
  res.json({
    user,
  });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    // encrypt password
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    msg: 'put API - usersPut',
    user,
  });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - usersPatch',
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: 'delete API - usersDelete',
  });
};

module.exports = {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
};
