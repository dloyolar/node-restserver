const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const {
  isValidRole,
  emailExists,
  userIdExists,
} = require('../helpers/db-validators');

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete,
  usersPatch,
} = require('../controllers/user');

const router = Router();

router.get('/', usersGet);

router.put(
  '/:id',
  [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(userIdExists),
    check('role').custom(isValidRole),
    validateFields,
  ],
  usersPut
);

router.post(
  '/',
  [
    check('name', 'name is required').not().isEmpty(),
    check(
      'password',
      'password is required and more than 6 characters'
    ).isLength({ min: 6 }),
    check('email', 'The email is not valid').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isValidRole),
    validateFields,
  ],
  usersPost
);

router.delete(
  '/:id',
  [
    check('id', 'ID not valid').isMongoId(),
    check('id').custom(userIdExists),
    validateFields,
  ],
  usersDelete
);

router.patch('/', usersPatch);

module.exports = router;
