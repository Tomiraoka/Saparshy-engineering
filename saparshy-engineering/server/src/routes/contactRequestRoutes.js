const express = require('express');
const router = express.Router();

const { createRequest, getRequests, updateRequestStatus } = require('../controllers/contactRequestController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/')
  .post(createRequest)
  .get(protect, admin, getRequests);

router.route('/:id/status').put(protect, admin, updateRequestStatus);

module.exports = router;
