const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT, validateFields } = require('../middlewares');

const { createCategory } = require('../controllers/categories');

const router = Router();

// GET ALL CATEGORIES - PUBLIC
router.get('/', (req, res) => {
  res.json('get');
});

// GET ONE CATEGORY BY ID - PUBLIC
router.get('/:ID', (req, res) => {
  res.json('get - ID');
});

// CREATE CATEGORY - PRIVATE FOR ANY WITH VALID TOKEN
router.post(
  '/',
  [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields,
  ],
  createCategory
);

// UPDATE CATEGORY - PRIVATE - FOR ANY WITH VALID TOKEN
router.put('/:id', (req, res) => {
  res.json('put');
});

// DELETE CATEGORY - PRIVATE - ONLY ADMIN
router.delete('/:id', (req, res) => {
  res.json('delete');
});

module.exports = router;
