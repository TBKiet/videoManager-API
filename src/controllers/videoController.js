const videoService = require('../services/videoService');
const logger = require('../config/logger');

class VideoController {
  // Create a new video record
  async createVideo(req, res) {
    try {
      const { userId } = req.headers;
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      const video = await videoService.createVideo({ ...req.body, userId });
      res.status(201).json(video);
    } catch (error) {
      logger.error(`Error in createVideo controller: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }

  // Get all videos for a user
  async getAllVideos(req, res) {
    try {
      const { userId } = req.headers;
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      const videos = await videoService.getAllVideos(userId);
      res.json(videos);
    } catch (error) {
      logger.error(`Error in getAllVideos controller: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }

  // Get video by ID
  async getVideoById(req, res) {
    try {
      const { userId } = req.headers;
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      const video = await videoService.getVideoById(req.params.id, userId);
      res.json(video);
    } catch (error) {
      logger.error(`Error in getVideoById controller: ${error.message}`);
      if (error.message === 'Video not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Update video status
  async updateVideoStatus(req, res) {
    try {
      const { userId } = req.headers;
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      const { status, metadata } = req.body;
      const video = await videoService.updateVideoStatus(req.params.id, userId, status, metadata);
      res.json(video);
    } catch (error) {
      logger.error(`Error in updateVideoStatus controller: ${error.message}`);
      if (error.message === 'Video not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Delete video
  async deleteVideo(req, res) {
    try {
      const { userId } = req.headers;
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      const result = await videoService.deleteVideo(req.params.id, userId);
      res.json(result);
    } catch (error) {
      logger.error(`Error in deleteVideo controller: ${error.message}`);
      if (error.message === 'Video not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }

  // Get video status
  async getVideoStatus(req, res) {
    try {
      const { userId } = req.headers;
      if (!userId) {
        return res.status(401).json({ error: 'User ID is required' });
      }

      const status = await videoService.getVideoStatus(req.params.id, userId);
      res.json(status);
    } catch (error) {
      logger.error(`Error in getVideoStatus controller: ${error.message}`);
      if (error.message === 'Video not found') {
        res.status(404).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}

module.exports = new VideoController(); 