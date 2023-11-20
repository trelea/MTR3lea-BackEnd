require('dotenv').config();

const path = require('path')
const bcrypt = require('bcryptjs');
const db = require('../../config/db');
const { singupValidation } = require('../../config/authValidation');
const { sendCode } = require('../../scripts/mailTransporter');
const jwt = require('jsonwebtoken');
const { encryptText } = require('../../config/cryption');


module.exports = async(req, res) => {
    //REQUEST BODY
    const { email, username, date } = req.body;

    //VALIDATION
    const { error } = singupValidation(req.body);
    if (error) {
        return res.status(400).json({
            error: error.message
        }).end();
    }

    //CHECK IF USER NOT EXISTS THEN INSERT INTO DB
    //try {

        const existentUser = await db.query("SELECT user_name FROM users WHERE user_name=$1", [username]);
        const existenmtEmail = await db.query("SELECT user_email FROM users WHERE user_email=$1", [email]);
        if (existentUser.rowCount === 1) {
            return res.status(201).json({ msg: 'This user already exists' }).end();
        }
        if (existenmtEmail.rowCount === 1) {
            return res.status(201).json({ msg: 'This email is already used' }).end();
        };

        /*
        var profileThumb = '/images/profilesThumbnails/defaultUserProfileThumbnail.png';
        if (req.file) {
            if (req.file.mimetype === 'image/png' ||
                req.file.mimetype === 'image/jpeg'||
                req.file.mimetype === 'image/webp') 
                profileThumb = `/images/profilesThumbnails/${req.file.filename}`
        } 
 
        res.cookie('newUser', username,   { httpOnly: true });
        res.cookie('newUserDate', date,   { httpOnly: true });
        res.cookie('newUserEmail', email, { httpOnly: true });
        res.cookie('newUserThumbnail', profileThumb, { httpOnly: true});
        */

        const OTPcode = Math.trunc((Math.random() * (999999 - 100000) + 100000));
        const token = {
            newUser: username,
            newUserDate: date,
            newUserEmail: email,
            newUserOTP: OTPcode,
            tokenCreationDate: new Date().toISOString()
        }
        const newUserVerification = jwt.sign(token, process.env.JWT_SIGNUP_KEY, { expiresIn: '1h'});
        res.cookie('newUserVerificationInfo', encryptText(newUserVerification), { 
            httpOnly: true, 
            expires: new Date(Date.now() + 3600000) 
        });
        
        sendCode(email, OTPcode);

        return res.status(200).json({
            user_otp: OTPcode,
            user_ip: (req.ip).replace('::ffff:', ''),
            user_email: `${email}`,
            otp_expire: '1h'
        }).end();
    
    
    //} catch (err) {
    //    return res.status(500).json({
    //        msg: "Something Went Wrong",
    //        error: err
    //    }).end();
    //};
}