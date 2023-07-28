const router = require('express').Router();
const profileController = require('../controllers').profile;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, profileController.profile);

module.exports = router;