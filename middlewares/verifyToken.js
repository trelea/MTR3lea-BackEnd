require('dotenv').config();
const jwt = require('jsonwebtoken');
const { decryptText } = require('../config/cryption');

const verifyToken = (req, res, next) => {

    if (!req.cookies.SecretToken && !req.cookies.User) {
        return res.status(401).json({ msg: "Access Denied." }).end(); 
    };

    try {
        const decryptedToken = decryptText(req.cookies.SecretToken);
        const verifiedToken = jwt.verify(decryptedToken,  process.env.JWT_LOGIN_KEY);
        if (verifiedToken.name !== req.cookies.User) { 
            return res.status(401).json({ msg: "Access Denied." }).end(); 
        };
        next();
    } catch (err) {
        return res.status(401).json({ error: err }).end();
    }
}

module.exports.verifyToken = verifyToken;