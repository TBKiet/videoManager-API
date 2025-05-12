const Video = require('../models/Video');
const cloudinary = require('cloudinary').v2;
const logger = require('../config/logger');

class VideoService {
  // Create a new video record
  async createVideo(videoData) {
    try {
      const video = new Video(videoData);
      await video.save();
      return video;
    } catch (error) {
      logger.error(`Error creating video: ${error.message}`);
      throw error;
    }
  }

  // Get all videos for a user
  async getAllVideos(userId) {
    try {
      return await Video.find({ userId }).sort({ createdAt: -1 });
    } catch (error) {
      logger.error(`Error getting all videos: ${error.message}`);
      throw error;
    }
  }

  // Get video by ID and userId
  async getVideoById(videoId, userId) {
    try {
      const video = await Video.findOne({ videoId, userId });
      if (!video) {
        throw new Error('Video not found');
      }
      return video;
    } catch (error) {
      logger.error(`Error getting video by ID: ${error.message}`);
      throw error;
    }
  }

  // Update video status
  async updateVideoStatus(videoId, userId, status, metadata = {}) {
    try {
      const video = await Video.findOne({ videoId, userId });
      if (!video) {
        throw new Error('Video not found');
      }

      video.status = status;
      if (Object.keys(metadata).length > 0) {
        video.metadata = { ...video.metadata, ...metadata };
      }
      
      await video.save();
      return video;
    } catch (error) {
      logger.error(`Error updating video status: ${error.message}`);
      throw error;
    }
  }

  // Delete video
  async deleteVideo(videoId, userId) {
    try {
      const video = await Video.findOne({ videoId, userId });
      if (!video) {
        throw new Error('Video not found');
      }

      // Delete from Cloudinary if URL exists
      if (video.cloudinaryUrl) {
        const publicId = video.cloudinaryUrl.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
      }

      await Video.deleteOne({ videoId, userId });
      return { message: 'Video deleted successfully' };
    } catch (error) {
      logger.error(`Error deleting video: ${error.message}`);
      throw error;
    }
  }

  // Get video processing status
  async getVideoStatus(videoId, userId) {
    try {
      const video = await Video.findOne({ videoId, userId });
      if (!video) {
        throw new Error('Video not found');
      }
      return {
        status: video.status,
        metadata: video.metadata
      };
    } catch (error) {
      logger.error(`Error getting video status: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new VideoService(); 