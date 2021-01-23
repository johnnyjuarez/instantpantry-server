// imports
const express = require('express');
const jsonBodyParser = express.json();
const AuthServices = require('./auth-services');

const authRouter = express.Router();

authRouter.post('/login', jsonBodyParser, (req, res, next) => {
  // get username and password from body
  const { username, password } = req.body;
  // store username nad password in loginUser object
  const loginUser = { username, password };
  // verify that all keys have values
  for (const [key, value] of Object.entries(loginUser)) {
    if (value === null) {
      return res.status(400).json({
        error: `Missing ${key} in request body`,
      });
    }
  }
  // verify username
  return AuthServices.getUsername(req.app.get('db'), loginUser.username)
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(400).json({
          error: 'Incorrect username or password',
        });
      }
      // verify password
      return AuthServices.comparePassword(loginUser.password, dbUser.password)
        .then((passMatch) => {
          if (!passMatch) {
            return res.status(400).json({
              error: 'Incorrect username or password',
            });
          }
          // pass dbUser data to create JWT token
          const sub = dbUser.username;
          const payload = { username: dbUser.username };
          return res.send({
            authToken: AuthServices.createJWT(sub, payload),
            id: dbUser.id
          });
        });
    })
    .catch(next);

});

module.exports = authRouter;