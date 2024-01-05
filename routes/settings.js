const router = require('express').Router();
const generatePswdToken = require('../controllers/settings/generatePswdToken');
const resetPassword = require('../controllers/settings/resetPassword')

router.post('/generatepswdtoken', generatePswdToken);
router.put('/resetpswd', resetPassword);

module.exports = router;