const path = require('path');
const { response } = require('express');

const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

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

const updateImgCloud = async (req, res = response) => {
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
    const nameArr = model.img.split('/');
    const name = nameArr.at(-1);
    const [public_id] = name.split('.');
    cloudinary.uploader.destroy(public_id);
  }

  const { tempFilePath } = req.files.file;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;

  await model.save();

  res.json(model);
};

const showImage = async (req, res = response) => {
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
      return res.sendFile(pathImage);
    }
  }

  const pathImage = path.join(__dirname, '../assets/no-image.jpg');
  res.sendFile(pathImage);
};

module.exports = {
  loadFile,
  updateImg,
  showImage,
  updateImgCloud,
};
