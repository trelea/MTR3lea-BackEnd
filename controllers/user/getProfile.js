const db = require('../../config/db');

module.exports = async (req, res) => {
    const User = await (await db.query("SELECT user_id, user_name, user_thumbnail FROM users WHERE user_name=$1", [req.cookies.User])).rows[0];
    return res.status(200).json({
        user_id: User.user_id,
        user_name: User.user_name,
        user_thumbnail: User.user_thumbnail
    }).end();
}