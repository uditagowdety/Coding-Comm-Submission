const jwt = require('jsonwebtoken')
const CustomError = require('../errors/customError');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new CustomError('No token provided')
  }

  const token = authHeader.split(' ')[1] // Extract token after "Bearer"
  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const {id,username,email}=verified; // Attach decoded payload to the request object
    req.user={id,username,email}
    next(); // Move to the next middleware or controller
  } catch (err) {
    res.status(400).json({
      error: 'Invalid token. Please log in again.',
    });
  }
};

module.exports = authMiddleware;
