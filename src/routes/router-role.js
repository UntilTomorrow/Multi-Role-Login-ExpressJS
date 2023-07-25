const router = require('express').Router();
const roleController = require('../controllers').role;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, verifyUser.isAdmin, roleController.role);

module.exports = router;