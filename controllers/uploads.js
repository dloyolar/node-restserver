const path = require('path');
const { response } = require('express');
const { uploadFile } = require('../helpers');

const { User, Product } = require('../models');
const fs = require('fs');

const loadFile = async (req, res = response) => {
  try {
    const name = await uploadFile(req.files, undefined, 'imgs');
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateImg = async (req, res = response) => {
  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case 'users':
      model = await User.findById(id);
      if (!model) {
        res.status(400).json({ msg: `Doesnt exists an User with ID ${id}` });
      }
      break;
    case 'products':
      model = await Product.findById(id);
      if (!model) {
        res.status(400).json({ msg: `Doesnt exists a product with ID ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: 'Oops something went wrong' });
  }

  // clean previous imgs
  if (model.img) {
    const pathImage = path.join(__dirname, '../uploads', collection, model.img);
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const name = await uploadFile(req.files, undefined, collection);

  model.img = name;

  await model.save();

  res.json(model);
};

module.exports = {
  loadFile,
  updateImg,
};
