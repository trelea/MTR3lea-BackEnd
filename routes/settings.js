const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');
const upload = require('../middlewares/profileThumbanil');
const generatePswdToken = require('../controllers/settings/generatePswdToken');
const resetPassword = require('../controllers/settings/resetPassword');
const updateProfile = require('../controllers/settings/updateProfile');
const removeThumb = require('../controllers/settings/removeThumb');
const delteAcc = require('../controllers/settings/deleteAcc');

router.post('/generatepswdtoken', generatePswdToken);
router.put('/resetpswd', resetPassword);
router.put('/updateprofile', verifyToken, upload.single('thumbnail'), updateProfile);
router.put('/removethumb', verifyToken, removeThumb);
router.delete('/deleteacc', verifyToken, delteAcc)

module.exports = router;