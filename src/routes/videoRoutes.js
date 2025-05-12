const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Create a new video record
router.post('/', videoController.createVideo);

// Get all videos
router.get('/', videoController.getAllVideos);

// Get video by ID
router.get('/:id', videoController.getVideoById);

// Update video status
router.put('/:id/status', videoController.updateVideoStatus);

// Delete video
router.delete('/:id', videoController.deleteVideo);

// Get video status
router.get('/:id/status', videoController.getVideoStatus);

module.exports = router; 