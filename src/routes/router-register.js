const router = require('express').Router();
const registerController = require('../controllers').register;
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogout, registerController.formRegister);
router.post('/save', verifyUser.isLogout, (req, res) => {
    console.log(req.body);
    registerController.saveRegister(req, res);
  });
  

module.exports = router;