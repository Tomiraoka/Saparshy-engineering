const express = require('express');
const router = express.Router();

const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

const upload = require('../middlewares/upload');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .get(getServices)
  .post(protect, admin, upload.single('image'), createService);

router.route('/:id')
  .get(getServiceById)
  .put(protect, admin, upload.single('image'), updateService)
  .delete(protect, admin, deleteService);

module.exports = router;
