const db = require('../../config/db');
const { postValidation } = require('../../config/postValidation');

module.exports = async (req, res) => {
    const { title, description } = req.body;

    const { error } = postValidation(req.body);
    if (error) {
        return res.status(400).json({
            error: error.message
        }).end();
    }

    try {
        var postThumb = '/images/postsThumbnails/defaultPostThumbnail.jpg';
        if (req.file) {
            if (req.file.mimetype === 'image/png' ||
                req.file.mimetype === 'image/jpeg'||
                req.file.mimetype === 'image/webp') 
                postThumb = `/images/postsThumbnails/${req.file.filename}`
        }
        const currentUser = req.cookies.User;

        const sqlQuery = "INSERT INTO posts (user_name, post_title, post_description, post_thumbnail) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [currentUser, title, description, postThumb]
        const newPost = await db.query(sqlQuery, values);
        const post = newPost.rows[0]
        return res.status(200).json({
            msg: "New Post Created.",
            post
        }).end()
        
    } catch (err) {
        return res.status(500).json({
            msg: "Something Went Wrong",
            error: err
        }).end();
    }

}