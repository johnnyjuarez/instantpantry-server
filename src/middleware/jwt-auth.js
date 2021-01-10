const AuthService = require('../auth/auth-services');

function requireAuth(req, res, next) {
  const authToken = req.get('Authorization') || '';
  let bearerToken;
  // verify bearer token exists
  if(!authToken.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({error: 'Missing bearer token'});
  } else {
    // set bearer token to the token minus 'bearer ' (7)
    bearerToken = authToken.slice(7, authToken.length);
  }

  try {
    // pass payload verified with authservice
    const payload = AuthService.verifyJWT(bearerToken);
    // get userinfo to pass in request body
    AuthService.getUsername(req.app.get('db'), payload.sub)
      .then((user) => {
        if(!user) {
          return res.status(401).json({error: 'Unauthorized request'});
        }
        req.user = user;
        next();
      })
      .catch((err) => {
        console.error(err);
        next(err);
      });
  } catch (error) {
    res.status(401).json({error: 'Unauthorized request'});
  }
}
module.exports = requireAuth;