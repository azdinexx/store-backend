const jwt = require('jsonwebtoken');

function extractIdFromToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decoded.UserInfo.id;
    return id;
  } catch (error) {
    console.error('Failed to extract ID from token:', error);
    return null;
  }
}

module.exports = extractIdFromToken;
