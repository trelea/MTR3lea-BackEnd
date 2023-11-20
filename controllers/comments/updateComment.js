const db = require('../../config/db');

module.exports = async (req, res) => {
    const { id } = req.params;
    var { comment } = req.body;

    try {
        const existentComment = await db.query("SELECT * FROM comments WHERE comment_id=$1 and user_name=$2", [id, req.cookies.User]);
        if (existentComment.rowCount === 0) {
            return res.status(201).json({
                msg: "Invalid comment"
            }).end();
        }

        if (String(comment).length < 1) {
            return res.status(400).json({
                msg: "Null comment"
            }).end();
        }

        const resultSQL = await db.query("UPDATE comments SET comment_text=$1 WHERE comment_id=$2 RETURNING *", [comment, id]);
        comment = resultSQL.rows[0]

        if (resultSQL.rowCount === 1 && resultSQL.command === "UPDATE") { 
            return res.status(200).json({
                msg: "Comment Successfully Updated",
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