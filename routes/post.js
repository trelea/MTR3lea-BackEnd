const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');
const upload = require('../middlewares/postThumbnail');
const getPost = require('../controllers/posts/getPost');
const getPosts = require('../controllers/posts/getPosts');
const createPost = require('../controllers/posts/postPost');
const updatePost = require('../controllers/posts/updatePost');
const deletePost = require('../controllers/posts/deletePost');
const likePost = require('../controllers/posts/likePost');
const searchPosts = require('../controllers/posts/searchPosts');

router.get('/', getPosts);
router.get('/:id', verifyToken, getPost);
router.post('/', verifyToken, upload.single('thumbnail'), createPost);
router.put('/:id', verifyToken, upload.single('thumbnail'), updatePost);
router.delete('/:id', verifyToken, deletePost);
router.get('/search/:post_title', searchPosts);

router.put('/like/:id', verifyToken, likePost);

module.exports = router