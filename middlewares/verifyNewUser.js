require('dotenv').config();
const jwt = require('jsonwebtoken');
const { decryptText } = require('../config/cryption');

const verifyNewUser = async (req, res, next) => {
    
    if (!req.cookies.newUserVerificationInfo) {
        return res.status(401).json({
            msg: "Something Went Wrong You dont have cookies."
        }).end();
    }

    //try {
    jwt.verify(decryptText(req.cookies.newUserVerificationInfo), process.env.JWT_SIGNUP_KEY);
    next();
    //}catch (err) {
    //    return res.status(401).json({
    //        error: err
    //    }).end();
    //}
    
}

module.exports.verifyNewUser = verifyNewUser;