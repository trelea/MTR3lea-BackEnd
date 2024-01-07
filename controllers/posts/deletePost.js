const db = require('../../config/db');
const fs = require('node:fs')

const deletePostThumbnail = (path) => {
    try {
        let arr = __dirname.split('\\');
        console.log(arr);
        for (let i = 0; i < 2; i++) arr.pop();
        fs.unlinkSync(`${arr.join('/')}/uploads${path}`);
    } catch (err) {
        console.log(err)
    }
}

module.exports = async (req, res) => {

    try {
        const existentPost = await db.query("SELECT * FROM posts where user_name=$1 and post_id=$2", [req.cookies.User, req.params.id]);

        if (existentPost.rowCount === 0) {
            return res.status(201).json({
                msg: 'Invalid Post'
            }).end();
        }

        const sqlQuery = "DELETE FROM posts WHERE user_name=$1 and post_id=$2 RETURNING *";
        const values = [req.cookies.User, req.params.id];
        const deltedPost = await db.query(sqlQuery, values);
        const post_id = deltedPost.rows[0].post_id
        const post_thumbnail = deltedPost.rows[0].post_thumbnail

        if (post_thumbnail !== '/images/postsThumbnails/defaultPostThumbnail.jpg') {
            deletePostThumbnail(post_thumbnail)
        }

        if (deltedPost.command === 'DELETE' && deltedPost.rowCount === 1) {
            return res.status(200).json({
                msg: "Post Deleted",
                post_id
            }).end();
        }

    } catch (err) {
        return res.status(500).json({
            msg: "Something Went Wrong",
            error: err
        }).end();
    }
    
}