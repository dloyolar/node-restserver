const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

const { loadFile } = require('../controllers/uploads');

const router = Router();

router.post('/', loadFile);

module.exports = router;
