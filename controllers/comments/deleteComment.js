const db = require('../../config/db');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        const existentComment = await db.query("SELECT * FROM comments WHERE comment_id=$1 and user_name=$2", [id, req.cookies.User]);
        if (existentComment.rowCount === 0) {
            return res.status(201).json({
                msg: "Invalid comment"
            }).end();
        }

        const postId = existentComment.rows[0].post_id;
        const nrCommentsOfPost = await db.query("SELECT post_comments FROM posts WHERE post_id=$1", [postId])
        var nrOfComments = (nrCommentsOfPost.rows[0].post_comments) - 1;
        const decrementNrComments = await db.query("UPDATE posts SET post_comments=$1 WHERE post_id=$2", [nrOfComments, postId]);
        const deleteComment = await db.query("DELETE FROM comments WHERE comment_id=$1", [id]);

        return res.status(200).json({
            msg: "Comment Successfully Deleted",
            post_id: postId 
        }).end()

    
    } catch (err) {
        return res.status(500).json({
            msg: "Something Went Wrong",
            error: err
        }).end();
    }
}