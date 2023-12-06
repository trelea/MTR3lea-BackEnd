const db = require('../../config/db');

module.exports = async (req, res) => {
    let topPosts = await db.query("SELECT * FROM posts ORDER BY ARRAY_LENGTH(post_likes, 1) LIMIT 10")
    topPosts = topPosts.rows
    return res.status(200).json({
        topPosts
    }).end()
}