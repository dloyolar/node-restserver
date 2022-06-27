const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories');

const {
  categoryExists,
  categoryNameExists,
  categoryDisabled,
} = require('../helpers/db-validators');

const router = Router();

router.get('/', getCategories);

router.get(
  '/:id',
  [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(categoryExists),
    validateFields,
  ],
  getCategory
);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields,
  ],
  createCategory
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(categoryExists),
    check('id').custom(categoryDisabled),
    check('name', 'name is required').not().isEmpty(),
    check('name').custom(categoryNameExists),
    validateFields,
  ],
  updateCategory
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(categoryExists),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
