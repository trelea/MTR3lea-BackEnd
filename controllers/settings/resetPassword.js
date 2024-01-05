require('dotenv').config();
const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { passwordValidation } = require('../../config/authValidation');
const { decryptText } = require('../../config/cryption');


module.exports = async (req, res) => {

    const { otpCode } = req.body;
    const { password } = req.body;
    const { confirmPassword } = req.body;

    const { error } = passwordValidation({password});
    if (error) {
        return res.status(400).json({
            error: error.message
        }).end();
    }

    if (password !== confirmPassword) {
        return res.status(201).json({
            msg: "passwords does not match"
        }).end();   
    }

    try {

        const decodedVerifcation = jwt.decode(decryptText(req.cookies.ResetPassword));
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        if (decodedVerifcation.reset_pswd === Number(otpCode)) {
            const newPassword = await db.query("UPDATE users SET user_password=$1 WHERE user_name=$2 AND user_email=$3 RETURNING *", [
                hashedPassword,
                decodedVerifcation.user_name,
                decodedVerifcation.user_email
            ])
            res.clearCookie('ResetPassword');
            return res.status(200).json({
                msg: newPassword.command
            }).end();
        }
        
        return res.status(200).json({
            msg: "Wrong OTP code"
        }).end();

    } catch (err) {
        return res.status(200).json({
            error: err
        }).end();
    }

    
}