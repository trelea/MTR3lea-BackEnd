const db = require('../../config/db');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        const queryPost = await db.query("SELECT t1.post_id, t1.user_name, t2.user_thumbnail, t1.post_title, t1.post_description, t1.post_thumbnail, t1.post_likes, t1.post_comments, t1.post_created_at, t1.post_updated_at FROM posts t1 JOIN users t2 ON t1.user_name = t2.user_name WHERE t1.post_id=$1", [id]);
        const queryComments = await db.query("SELECT t1.comment_id, t1.post_id, t1.user_name, t2.user_thumbnail, t1.comment_text, t1.comment_created_at, t1.comment_updated_at FROM comments t1 JOIN users t2 ON t1.user_name = t2.user_name WHERE t1.post_id=$1 ORDER BY t1.id DESC", [id]);

        
        if (queryPost.rowCount === 0) return res.status(201).json({
            msg: "Invalid Post"
        })
        const comments = queryComments.rows;

        let post = JSON.stringify(queryPost.rows[0]);
        post = post.replaceAll("array_length", "post_likes");
        post = JSON.parse(post);

        return res.status(200).json({
            post,
            comments
        }).end();
    } catch (err) {
        return res.status(500).json({
            msg: "Invalid Post",
            error: err
        }).end();
    }
}
