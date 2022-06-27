const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

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
router.post('/', (req, res) => {
  res.json('POST');
});

// UPDATE CATEGORY - PRIVATE - FOR ANY WITH VALID TOKEN
router.put('/:id', (req, res) => {
  res.json('put');
});

// DELETE CATEGORY - PRIVATE - ONLY ADMIN
router.delete('/:id', (req, res) => {
  res.json('delete');
});

module.exports = router;
