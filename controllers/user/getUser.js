const db = require('../../config/db');

module.exports = async (req, res) => {
    const { user_name } = req.params
    
    try {
        const existentUserData = await db.query("SELECT * FROM users WHERE user_name=$1", [user_name]);
        
        if (existentUserData.rowCount === 1) {
            const userPosts = await db.query("SELECT t1.id, t1.post_id, t1.user_name, t2.user_thumbnail, t1.post_title, t1.post_thumbnail, t1.post_likes, t1.post_comments, t1.post_created_at, t1.post_updated_at FROM posts t1 JOIN users t2 ON t1.user_name = t2.user_name WHERE t1.user_name=$1", [user_name]);
            const posts = userPosts.rows
            return res.status(200).json({
                msg: 'Valid User', 
                user_name: existentUserData.rows[0].user_name,
                user_thumbnail: existentUserData.rows[0].user_thumbnail,
                posts
            }).end()
        }

        return res.status(201).json({
            msg: 'Invalid User',
        }).end()
    
    } catch (err) {
        return res.status(500).json({
            msg: "Something Went Wrong",
            error: err
        }).end()
    }
    
}