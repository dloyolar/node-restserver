const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateFile } = require('../middlewares');

const { loadFile, updateImg, showImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');

const router = Router();

router.post('/', loadFile);

router.put(
  '/:collection/:id',
  [
    validateFile,
    check('id', 'Should be a Mongo ID').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    validateFields,
  ],
  updateImg
);

router.get(
  '/:collection/:id',
  [
    check('id', 'Should be a Mongo ID').isMongoId(),
    check('collection').custom((c) =>
      allowedCollections(c, ['users', 'products'])
    ),
    validateFields,
  ],
  showImage
);

module.exports = router;
