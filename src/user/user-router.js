// imports
const express = require('express');
const UserService = require('./user-services');
const jsonBodyParser = express.json();
const path = require('path');

const userRouter = express.Router();

userRouter.post('/', jsonBodyParser, (req, res, next) => {
  const { username, name, password } = req.body;
  // field validation has values
  for (const field of ['username', 'name', 'password']) {
    if (!req.body[field]) {
      return res.status(400).json({
        error: `Missing ${field} in request body`,
      });
    }
  }

  // password validation using services from UsersService
  const passwordError = UserService.getInvalidPasswordMessage(password);
  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }
  UserService.hasUserWithUsername(req.app.get('db'), username)
    .then((hasUserWithUsername) => {
      if (hasUserWithUsername) {
        return res.status(400).json({ error: 'Username already in use' });
      }
      return UserService.hashPassword(password)
        .then((hashedPassword) => {
          const newUser = {
            username,
            name,
            password: hashedPassword
          };
          return UserService.insertUser(req.app.get('db'), newUser)
            .then(user => {
              res.status(201)
                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                .json(UserService.serializeUser(user));
            });

        });
    })
    .catch(next);
});

module.exports = userRouter;