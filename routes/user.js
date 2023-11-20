const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');
const getUser = require('../controllers/user/getUser');
const getProfile = require('../controllers/user/getProfile');

router.get('/profile/:user_name', verifyToken, getUser);
router.get('/profile', verifyToken, getProfile);

module.exports = router;