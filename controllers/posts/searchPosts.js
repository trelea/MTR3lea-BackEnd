const db = require('../../config/db')

/*

FUCKING LONG SQL QUERY


"SELECT post_id, post_title, user_name, post_thumbnail FROM posts WHERE

post_title LIKE $1 OR 
post_title LIKE UPPER($1) OR 
post_title LIKE LOWER($1) OR 

post_title LIKE $2 OR 
post_title LIKE UPPER($2) OR 
post_title LIKE LOWER($2) OR

post_title LIKE $3 OR 
post_title LIKE UPPER($3) OR 
post_title LIKE LOWER($3) OR

post_title LIKE $4 OR 
post_title LIKE UPPER($4) OR 
post_title LIKE LOWER($4) 

ORDER BY id DESC LIMIT 100", [post_title, post_title + '%', '%' + post_title, '%' + post_title + '%']


*/

module.exports = async (req, res) => {
	const { post_title } = req.params;
	try {
		let postSearched = await db.query("SELECT post_id, post_title, user_name, post_thumbnail FROM posts WHERE post_title LIKE $1 OR post_title LIKE UPPER($1) OR post_title LIKE LOWER($1) OR post_title LIKE $2 OR post_title LIKE UPPER($2) OR post_title LIKE LOWER($2) OR post_title LIKE $3 OR post_title LIKE UPPER($3) OR post_title LIKE LOWER($3) OR post_title LIKE $4 OR post_title LIKE UPPER($4) OR post_title LIKE LOWER($4) ORDER BY id DESC LIMIT 100", [post_title, post_title + '%', '%' + post_title, '%' + post_title + '%']);
		postSearched = postSearched.rows
		return res.status(200).json({
			postSearched
		}).end()
	} catch (err) {
		return res.status(401).json({
			error: err
		}).end()
	}
}