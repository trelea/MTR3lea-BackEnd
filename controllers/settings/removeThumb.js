const db = require('../../config/db');

module.exports = async (req, res) => {
    if (req.body.removeThumb === 'true') {
        const removeThumb = await db.query("UPDATE users SET user_thumbnail=$1 WHERE user_name=$2 RETURNING user_thumbnail", [
            '/images/profilesThumbnails/defaultUserProfileThumbnail.png',
            req.cookies.User
        ])
        return res.status(200).json({ removeThumb }).end();
    }
    return res.status(201).json({ msg: 'Invalid Argumets'}).end();
}