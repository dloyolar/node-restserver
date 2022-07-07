const { response } = require('express');
const { uploadFile } = require('../helpers');

const loadFile = async (req, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    res.status(400).json({ msg: 'No files were uploaded.' });
    return;
  }

  try {
    const name = await uploadFile(req.files, undefined, 'imgs');
    res.json({ name });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateImg = async (req, res = response) => {
  const { id, collection } = req.params;
  res.json({ id, collection });
};

module.exports = {
  loadFile,
  updateImg,
};
