const db = require('../../config/db');

module.exports = async (req, res) => {
    var { page, limit } = req.query;
    limit = parseInt(limit);
    page = parseInt(page);

    if ( (limit === 20 || limit === 50 || limit === 100) && (page >= 1) ) {

        const fullLimit = limit;
        const fullOffset = (page - 1) * fullLimit;
        const sqlQuery = "SELECT t1.post_id, t1.user_name, t2.user_thumbnail, t1.post_title, t1.post_thumbnail, t1.post_likes, t1.post_comments, t1.post_created_at, t1.post_updated_at FROM posts t1 JOIN users t2 ON t1.user_name = t2.user_name ORDER BY t1.id DESC LIMIT $1 OFFSET $2";
        const values = [fullLimit, fullOffset];
        const SQL = await db.query(sqlQuery, values);

        let Posts = SQL.rows;
        Posts = JSON.stringify(Posts).replaceAll("array_length", "post_likes");
        Posts = JSON.parse(Posts);

        if (Posts.length <= 0)  return res.status(201).json({ msg: "You are too far"}).end();

        return res.status(200).json({
            Posts
        }).end();
    } else {
        return res.status(400).json({
            msg: 'Invalid values for params'
        }).end();
    }

    
}