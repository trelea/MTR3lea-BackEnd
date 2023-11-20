const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyNewUser } = require('../middlewares/verifyNewUser');

const signup = require('../controllers/auth/signup');
const signin = require('../controllers/auth/signin');
const signout = require('../controllers/auth/signout');

const upload = require('../middlewares/profileThumbanil')
const verifyUser = require('../controllers/auth/verifyUser');


//==============================AUTH ROUTES==============================//

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', verifyToken, signout)
router.post('/verification', verifyNewUser, verifyUser);

module.exports = router

