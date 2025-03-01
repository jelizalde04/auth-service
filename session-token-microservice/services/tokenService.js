const jwt = require('jsonwebtoken');
const SessionToken = require('../models/SessionToken');
require('dotenv').config();

exports.generateToken = async (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
  const expiresAt = new Date(Date.now() + process.env.TOKEN_EXPIRATION * 1000);
  
  await SessionToken.create({ token, userId, expiresAt });
  return token;
};

exports.verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const storedToken = await SessionToken.findOne({ token, userId: decoded.userId });
    return !!storedToken;
  } catch {
    return false;
  }
};

exports.revokeToken = async (token) => {
  await SessionToken.deleteOne({ token });
};
