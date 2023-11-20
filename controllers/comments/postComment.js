const db = require('../../config/db');

module.exports = async (req, res) => {

    const { id } = req.params;
    var { comment } = req.body;
    
    
    try {
        const postExists = await db.query("SELECT * FROM posts WHERE post_id=$1", [id]);
        
        if (postExists.rowCount === 0) {
            return res.status(201).json({msg: "Invalid post"}).end;
        }
        if (String(comment).length < 1) {
            return res.status(400).json({msg: "Null comment"}).end;
        }

        const sqlComments = await db.query("SELECT post_comments FROM posts WHERE post_id=$1", [id]);
        var comms = sqlComments.rows[0].post_comments + 1;
        const sqlQuery_1 = "INSERT INTO comments (post_id , user_name , comment_text) VALUES ($1 , $2 , $3) RETURNING *";
        const sqlQuery_2 = "UPDATE posts SET post_comments=$1 WHERE post_id=$2";
        const values_1 = [id, req.cookies.User, comment];
        const values_2 = [comms, id];
        const newCommentPosted = await db.query(sqlQuery_1, values_1);
        const newCommentIncrimental = await db.query(sqlQuery_2, values_2);
        
        comment = newCommentPosted.rows[0]

        if (newCommentPosted.rowCount === 1 && newCommentPosted.command === "INSERT" &&
            newCommentIncrimental.rowCount === 1 && newCommentIncrimental.command === "UPDATE") {
            return res.status(200).json({
                msg: "Comment Successfully Posted",
                comment
            }).end()
        }
    
    
    } catch (err) {
        return res.status(500).json({
            msg: "Something Went Wrong",
            error: err
        }).end();
    }
    

}