// imports
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

// auth service object
const AuthService = {
  // get username method
  getUsername(db, username) {
    return db('instantpantry_user')
      .select('*')
      .where({username})
      .first();
  },
  // compare passwords for authentication
  comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  },
  // create jwt token
  createJWT(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    });
  },
  // verify jwt token for authentication
  verifyJWT(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ['HS256']
    });
  },
};

module.exports = AuthService;