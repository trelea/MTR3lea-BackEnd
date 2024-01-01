const db = require('../../config/db');
const { updatePostValidation } = require('../../config/updatePostValidation');

module.exports = async (req, res) => {
    const { error } = updatePostValidation({
        title: req.body.title,
        description: req.body.description,
        id: req.params.id
    });
    if (error) {
        return res.status(400).json({
            error: error.message
        }).end();
    }
    
    try {
        const existentPost = await db.query("SELECT * FROM posts where user_name=$1 and post_id=$2", [req.cookies.User, req.params.id]);

        if (existentPost.rowCount === 0) {
            return res.status(201).json({
                msg: 'Invalid Post'
            }).end()
        }

        var postThumb = existentPost.rows[0].post_thumbnail;
        if (req.file) {
            if (req.file.mimetype === 'image/png' ||
                req.file.mimetype === 'image/jpeg'||
                req.file.mimetype === 'image/webp') 
                postThumb = `/images/postsThumbnails/${req.file.filename}`
        }

        const sqlQuery = "UPDATE posts SET post_title=$1, post_description=$2, post_thumbnail=$3 WHERE user_name=$4 and post_id=$5 RETURNING *";
        const values = [req.body.title, req.body.description, postThumb, req.cookies.User, req.params.id];
        const updatedPost = await db.query(sqlQuery, values);
        const post = updatedPost.rows[0];
        if (updatedPost.command === 'UPDATE' && updatedPost.rowCount === 1) {
            return res.status(200).json({
                msg: "Post Updated",
                post
            }).end();
        }

    } catch (err) {
        return res.status(500).json({
            msg: "Something Went Wrong",
            error: err
        }).end();
    }
}