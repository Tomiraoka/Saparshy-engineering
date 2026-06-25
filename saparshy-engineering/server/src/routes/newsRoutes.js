const express = require('express');
const router = express.Router();
const { getNews, getNewsById, createNews, updateNews, deleteNews, addComment } = require('../controllers/newsController');
const upload = require('../middlewares/upload');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getNews)
  .post(protect, admin, upload.single('image'), createNews);

router.route('/:id')
  .get(getNewsById)
  .put(protect, admin, upload.single('image'), updateNews)
  .delete(protect, admin, deleteNews);

router.route('/:id/comments').post(addComment);

module.exports = router;
