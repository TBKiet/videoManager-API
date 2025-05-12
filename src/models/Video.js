const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true  // Add index for faster queries
  },
  videoId: {
    type: String,
    required: true,
    unique: true
  },
  cloudinaryUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['processing', 'completed', 'failed'],
    default: 'processing'
  },
  metadata: {
    duration: Number,
    numScenes: Number,
    numAudioSegments: Number,
    effects: [String],
    transitions: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
videoSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Video', videoSchema); 