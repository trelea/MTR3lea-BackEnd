const db = require('../../config/db');

module.exports = async (req, res) => {
    const { user_name } = req.params
    
    try {
        const existentUserData = await db.query("SELECT * FROM users WHERE user_name=$1", [user_name]);
        
        if (existentUserData.rowCount === 1) {
            const userPosts = await db.query("SELECT * FROM posts WHERE user_name=$1", [user_name]);
            const posts = userPosts.rows
            return res.status(200).json({
                msg: 'Valid User', 
                user: existentUserData.rows[0].user_name,
                thumbnail: existentUserData.rows[0].user_thumbnail,
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