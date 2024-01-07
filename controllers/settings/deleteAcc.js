const db = require('../../config/db');
const bycrypt = require('bcryptjs');

module.exports = async (req, res) => {
    const { password } = req.body;

    const userHashedPassword = (await db.query("SELECT user_password FROM users WHERE user_name=$1", [req.cookies.User])).rows[0].user_password;

    bycrypt.compare(password, userHashedPassword)
        .then(password => {
            if (password) {
                db.query("DELETE FROM users WHERE user_name=$1", [req.cookies.User])
                    .then(result => result.command)
                    .then(response => {
                        res.clearCookie('SecretToken');
                        res.clearCookie('User');
                        return res.status(200).json({ response }).end();
                    })
            } else { return res.status(201).json({ password }).end() }; 
        })
}