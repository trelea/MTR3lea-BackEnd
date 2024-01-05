require('dotenv').config();
const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const { encryptText } = require('../../config/cryption');
const { sendCode } = require('../../scripts/resetPassword');

module.exports = async (req, res) => {
    const { email } = req.body;

    const checkMail = await db.query("SELECT user_name, user_email FROM users WHERE user_email=$1", [email]);
    
    if (!checkMail.rows.length) return res.status(201).json({ msg: "No User Found" }).end();
    
    //GENERATE JWT TOKEN THEN SIGN IT
    const newOTP = Math.trunc((Math.random() * (999999 - 100000) + 100000));
    const token = {
        user_name:  checkMail.rows[0].user_name,
        user_email: checkMail.rows[0].user_email,
        reset_pswd: newOTP,
        tokenCreationDate: new Date().toISOString()
    }
    const newResetPswdJwtToken = jwt.sign(token, process.env.JWT_RESETPSWD_KEY, { expiresIn: '1h'});
    res.cookie('ResetPassword', encryptText(newResetPswdJwtToken), {
        httpOnly: true, 
        expires: new Date(Date.now() + 3600000) 
    })
    sendCode(checkMail.rows[0].user_email, newOTP);

    return res.status(200).json({
        user_ip: (req.ip).replace('::ffff:', ''),
        user_email: `${checkMail.rows[0].user_email}`,
        otp_expire: '1h'
    }).end();

}