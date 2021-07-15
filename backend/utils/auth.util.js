const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.createToken = async function(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    // e.g. 90d
    expiresIn: process.env.JWT_EXPIRES_IN + "d",
  });
}

exports.hashPassword = async function(password) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

exports.verifyPassword = async function(password1, password2) {
  return bcrypt.compare(password1, password2);
}