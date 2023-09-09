import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Authentication failed. Token not provided' });
  }

  // Check if the Authorization header starts with 'Bearer '
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token format' });
  }

  // Extract the token without the 'Bearer ' prefix
  const token = authHeader.substring('Bearer '.length);

  try {
    const decoded = jwt.verify(token, 'respecttaelo');
    req.user = decoded;
    console.log('Decoded user', decoded);
    next(); // Move on to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
  }
};
