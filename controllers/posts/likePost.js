const db = require('../../config/db');

module.exports = async(req, res) => {
    const { id } = req.params;

    let post;
    try { 
        post = await db.query("SELECT * FROM posts WHERE post_id=$1", [id]);
    } catch {
        return res.status(201).json({ msg: "invalid post" }).end();
    }
    const likesArray = post.rows[0].post_likes;
    
    if (likesArray.includes(req.cookies.User) === false) {
        //LIKE POST
        const likePost = await db.query("UPDATE posts SET post_likes = ARRAY_APPEND(post_likes, $1) WHERE post_id=$2", [req.cookies.User, id]);
        return res.status(200).json({ likePost }).end();
    } else {
        //UNLIKE POST
        const unlikePost = await db.query("UPDATE posts SET post_likes = ARRAY_REMOVE(post_likes, $1) WHERE post_id=$2", [req.cookies.User, id]);
        return res.status(200).json({ unlikePost }).end();
    }

    
}