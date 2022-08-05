const jwt = require('jsonwebtoken');
require('dotenv').config();
const AuthError = require('../Errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { cookies } = req;

  if (!cookies) {
    throw new AuthError('Авторизация не успешна');
  } else {
    const token = cookies.jwt;
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'SECRET_KEY');
    } catch (err) {
      throw new AuthError('jwt token невалидный');
    }
    req.user = payload;
    next();
  }
};

module.exports = auth;
