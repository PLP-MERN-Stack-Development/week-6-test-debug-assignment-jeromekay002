const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'testsecret';

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
};
