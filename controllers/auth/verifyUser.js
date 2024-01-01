require('dotenv').config();
const db = require('../../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const { passwordValidation } = require('../../config/authValidation');
const { decryptText } = require('../../config/cryption');

const deleteCookies = (responseObject) => {
    responseObject.clearCookie('newUserVerificationInfo');
}

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

    const decodedVerifcation = jwt.decode(decryptText(req.cookies.newUserVerificationInfo));
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    if (decodedVerifcation.newUserOTP === Number(otpCode)) {
        const newUser = await db.query("INSERT INTO users (user_name , user_email , user_dateofbirth , user_password , user_isverified) VALUES ($1 , $2, $3, $4, $5) RETURNING *", [
            decodedVerifcation.newUser ,
            decodedVerifcation.newUserEmail ,
            decodedVerifcation.newUserDate ,
            hashedPassword ,
            't'
        ]);
        await db.query("INSERT INTO users_additional_info (user_name, user_additional_name) VALUES ($1, $2)", [
            decodedVerifcation.newUser ,
            decodedVerifcation.newUser
        ]);
        const User = newUser.rows[0];
        deleteCookies(res);
        return res.status(200).json({
            status: {
                user_name: User.user_name,
                user_created_at: User.user_created_at,
                user_updated_at: User.user_updated_at
            }
        }).end();
        
    } else {
        //deleteCookies(res);
        return res.status(200).json({
            msg: "Wrong OTP code"
        }).end();
    }
    
}