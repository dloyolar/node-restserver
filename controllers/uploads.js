const { response } = require('express');

const loadFile = (req, res = response) => {
  res.json({ msg: 'load file' });
};

module.exports = {
  loadFile,
};
