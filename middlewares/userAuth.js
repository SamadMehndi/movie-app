// importing jwt, config
const jwt = require('jsonwebtoken');
const config = require('../config/default.json');
const auth = require('./auth');

// This middleware function is verifying the user token
function verifyUserToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  // checking the token is given or not
  if (token == null) return res.sendStatus(404);
  if (!token) return res.status(404).send({ auth: false, message: 'No token provided.' });

  // If token is found then authenticate it and pass it into the next
  jwt.verify(token, config.jwtPrivateKey, (err, user) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    req.user = user;
    next();
  });
}

// this middleware is verifying if the user is only admin
function verifyAdmin(req, res, next) {
  const { role } = auth(req);
  if (role !== 'admin') {
    return res.status(401).send({ auth: false, message: 'Sorry! Only admin can access this page.' });
  }
  next();
}

// This middleware is verifying the user is user/admin
function verifyAdminUser(req, res, next) {
  const { role } = auth(req);
  const userRoles = ['admin', 'user'];

  if (userRoles.includes(role) === true) {
    next();
  } else {
    return res.status(401).send({ auth: false, message: 'Sorry! Only Admin/User can access this Page.' });
  }
}

// exporting middleware
module.exports = { verifyUserToken, verifyAdmin, verifyAdminUser };
