const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
const xss = require('xss');
const bcrypt = require('bcryptjs');

const UserService = {
  getInvalidPasswordMessage(password) {
    if(password.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if(password.length > 72) {
      return 'Password must be less than 72 characters';
    }
    if(password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start with or end with empty spaces';
    }
    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number and special character';
    }
    return null;
  },
  hasUserWithUsername(db, username) {
    return db('instantpantry_user')
      .where({ username })
      .first()
      .then((user) => !!user);
  },
  insertUser(db, newUser) {
    return db.insert(newUser)
      .into('instantpantry_user')
      .returning('*')
      .then(([user]) => user);
  },
  serializeUser(user) {
    return {
      id: user.id,
      username: xss(user.email),
    };
  },
  hashPassword(password) {
    return bcrypt.hash(password, 12);
  }
};

module.exports = UserService;