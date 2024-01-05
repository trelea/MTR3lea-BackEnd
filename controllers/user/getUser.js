const db = require('../../config/db');

module.exports = async (req, res) => {
    const { user_name } = req.params
    
    try {
        const existentUserData = await db.query("SELECT * FROM users WHERE user_name=$1", [user_name]);
        
        if (existentUserData.rowCount === 1) {

            const getUserPosts = await db.query("SELECT t1.id, t1.post_id, t1.user_name, t2.user_thumbnail, t1.post_title, t1.post_thumbnail, t1.post_likes, t1.post_comments, t1.post_created_at, t1.post_updated_at FROM posts t1 JOIN users t2 ON t1.user_name = t2.user_name WHERE t1.user_name=$1 ORDER BY t1.id DESC", [user_name]);
            const getUserInfos = await db.query("SELECT t1.user_name, t1.user_additional_name, t1.user_description, t2.user_thumbnail, t1.user_created_at FROM users_additional_info t1 JOIN users t2 ON t1.user_name = t2.user_name WHERE t1.user_name=$1", [user_name]);

            const posts = getUserPosts.rows;
            const infos = getUserInfos.rows[0];

            return res.status(200).json({
                msg: 'Valid User', 
                infos,
                posts
            }).end()
        }

        return res.status(201).json({
            msg: 'Invalid User',
        }).end()
    
    } catch (err) {
        return res.status(500).json({
            msg: 'Something Went Wrong',
            error: err
        }).end()
    }
    
}