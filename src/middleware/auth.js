const jwt = require('jsonwebtoken');
const logger = require('../config/logger');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Use id from NextAuth token instead of userId
    req.headers.userId = decoded.id;
    
    next();
  } catch (error) {
    logger.error(`Authentication error: ${error.message}`);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware; 