const { response } = require('express');

const usersGet = (req, res = response) => {
  const { name = 'no name', page = 1, limit } = req.query;
  res.json({
    msg: 'get API - usersGet',
    name,
    page,
    limit,
  });
};

const usersPost = (req, res = response) => {
  const { name, age } = req.body;
  res.json({
    msg: 'post API - usersPost',
    name,
    age,
  });
};

const usersPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: 'put API - usersPut',
    id,
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
