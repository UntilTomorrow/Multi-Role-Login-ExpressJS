const router = require('express').Router();
const roleController = require('../controllers').role;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, roleController.role);

module.exports = router;