const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const {
  productExists,
  productDisabled,
  categoryExists,
} = require('../helpers/db-validators');

const {
  getProducts,
  getProduct,
  updateProduct,
  createProduct,
  deleteProduct,
} = require('../controllers/products');

const router = Router();

router.get('/', getProducts);

router.get(
  '/:id',
  [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(productExists),
    validateFields,
  ],
  getProduct
);

router.post(
  '/',
  [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('category', 'category is required').not().isEmpty(),
    check('category', 'ID not valid').isMongoId(),
    check('category').custom(categoryExists),
    validateFields,
  ],
  createProduct
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(productExists),
    check('id').custom(productDisabled),
    check('category').optional().custom(categoryExists),
    validateFields,
  ],
  updateProduct
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(productExists),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
