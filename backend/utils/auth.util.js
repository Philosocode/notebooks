const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.createToken = async function(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    // e.g. 90d
    expiresIn: process.env.JWT_EXPIRES_IN + "d",
  });
}

exports.hashPassword = function(password) {
  return bcrypt.hash(password, 12);
}

// FROM: https://flaviocopes.com/how-to-uppercase-first-letter-javascript/
exports.verifyPassword = function(text) {
  if (typeof text !== 'string') return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
}