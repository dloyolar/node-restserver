const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');
const { validateFields } = require('../middlewares/validate-fields');
const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require('../controllers/user');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check(
      'password',
      'password is required and more than 6 characters'
    ).isLength({ min: 6 }),
    check('email', 'The email is not valid').isEmail(),
    check('role').custom(async (role = '') => {
      const existsRole = await Role.findOne({ role });
      if (!existsRole) throw new Error(`Role ${role} is not register in DB`);
    }),
    validateFields,
  ],
  usersPost
);

router.delete('/', usersDelete);

router.patch('/', usersPatch);

module.exports = router;
