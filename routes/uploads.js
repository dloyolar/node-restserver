const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFile } = require('../middlewares');

const { loadFile, updateImg } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post('/', loadFile);

router.put(
  '/:collection/:id',
  [
    validateFile,
    check('id', 'Should be a Mongo ID').isMongoId(),
    check('file', 'file is required').not().isEmpty(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    validateFields,
  ],
  updateImg
);

module.exports = router;
