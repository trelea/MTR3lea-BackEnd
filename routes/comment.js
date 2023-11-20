const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken');

const postComment = require('../controllers/comments/postComment');
const updateComment = require('../controllers/comments/updateComment');
const deleteComment = require('../controllers/comments/deleteComment');

router.post('/:id', verifyToken, postComment);
router.put('/:id', verifyToken, updateComment);
router.delete('/:id', verifyToken, deleteComment);

module.exports = router;