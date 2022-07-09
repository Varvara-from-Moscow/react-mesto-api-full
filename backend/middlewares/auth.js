const jwt = require('jsonwebtoken');

const AuthError = require('../Errors/AuthError');

const JWT_SECRET = 'SECRET';

const auth = (req, res, next) => {
  const { cookies } = req;

  if (!cookies) {
    throw new AuthError('Авторизация не успешна');
  } else {
    const token = cookies.jwt;
    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      throw new AuthError('jwt token невалидный');
    }
    req.user = payload;
    next();
  }
};

module.exports = auth;
