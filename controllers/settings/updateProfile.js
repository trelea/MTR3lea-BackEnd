const db = require('../../config/db');
const { updateUserProfileValidation } = require('../../config/updateUserProfileValidation');

module.exports = async (req, res) => {
    const { error } = updateUserProfileValidation({ user_additional_name: req.body.user_additional_name, user_description: req.body.user_description });
    if (error) return res.status(400).json({ error: error.message }).end();

    const existentUser = await db.query("SELECT user_name, user_thumbnail FROM users WHERE user_name=$1", [req.cookies.User]);
    if (!existentUser.rows.length) return res.status(201).json({ msg: "Something went wrong !!!" }).end();

    var userThumb = existentUser.rows[0].user_thumbnail;
    if (req.file) {
        if (req.file.mimetype === 'image/png' ||
            req.file.mimetype === 'image/jpeg'||
            req.file.mimetype === 'image/webp') {
                userThumb = `/images/profilesThumbnails/${req.file.filename}`;
                db.query("UPDATE users SET user_thumbnail=$1 WHERE user_name=$2", [userThumb, req.cookies.User]);
            } 
    }

    const newProfile = await db.query("UPDATE users_additional_info SET user_additional_name=$1, user_description=$2 WHERE user_name=$3 RETURNING *", [
        req.body.user_additional_name,
        req.body.user_description,
        req.cookies.User
    ])

    return res.status(200).json({
        msg: newProfile.command
    }).end();

}