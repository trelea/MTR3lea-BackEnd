const path = require('path')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const db = require('../../config/db');
const { loginValidation } = require('../../config/authValidation');
const { encryptText } = require('../../config/cryption');

module.exports = async(req, res) => {
    //REQUEST BODY
    const { email, password } = req.body;

    //VALIDATION
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({
            error: error.message
        }).end()
    }

    //CHECK IF USER EXISTS
    try {
        const existentUserData = await db.query("SELECT * FROM users WHERE user_email=$1", [email]);

        if (existentUserData.rowCount === 1) { 
            if (existentUserData.rows[0].user_isverified === false) {
                return res.status(201).json({
                    msg: `Account is not verified.`,
                    important: 'Acces the link that was sent to your email to verify your account.'
                }).end();
            }

            //CHECK IF PASSWORD IS VALID
            const isValidPassword = bcrypt.compareSync(password, existentUserData.rows[0].user_password)
            if (isValidPassword) {

                //CREATE JWT SIGN
                const jwtKey = process.env.JWT_LOGIN_KEY
                const userSign = {
                    id: existentUserData.rows[0].user_id,
                    name: existentUserData.rows[0].user_name,
                    email: existentUserData.rows[0].user_email,
                    dateofbirth: existentUserData.rows[0].user_dateofbirth,
                    password: existentUserData.rows[0].user_password,
                    userAdditionalInfo: existentUserData.rows[0].user_created_at + existentUserData.rows[0].user_updated_at,
                    tokenCreationDate: new Date().toISOString()
                }
                const token = jwt.sign(userSign, jwtKey, {expiresIn: '30d'});

                res.cookie('User', existentUserData.rows[0].user_name, {
                    httpOnly: true,
                    expires: new Date(Date.now() + (30 * 24 * 3600000))
                });
                res.cookie('SecretToken', encryptText(String(token)), {
                    httpOnly: true,
                    expires: new Date(Date.now() + (30 * 24 * 3600000))
                })

                return res.status(200).json({
                    msg: 'Logged In.',
                    //user_id: existentUserData.rows[0].user_id,
                    //user_name: existentUserData.rows[0].user_name,
                    //user_thumbnail: existentUserData.rows[0].user_thumbnail,
                    //user_token: encryptText(token)
                }).end();
            }
            return res.status(201).json({
                msg: `invalid email or password`
            }).end()
        }
        return res.status(201).json({
            msg: `invalid email or password`
        }).end()   
    } catch (err) {
        return res.status(500).json({
            msg: "Something Went Wrong",
            error: err
        }).end()
    }
}
