const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../Errors/NotFoundError');
const CastError = require('../Errors/CastError');
const ConflictError = require('../Errors/ConflictError');
const AuthError = require('../Errors/AuthError');

const JWT_TOKEN = 'SECRET';

module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
    about,
    avatar,
  } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      throw new ConflictError('Пользователь с таким email уже зарегистрирован');
    } else {
      bcrypt.hash(password, 10)
        .then((hash) => User.create({
          email,
          password: hash,
          name,
          about,
          avatar,
        }))
        .then((userData) => res.status(201).send({
          email: userData.email,
          id: userData._id,
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new CastError('Введены некорректные данные'));
          }
          if (err.code === 11000) {
            next(new ConflictError('Такой Email уже существует'));
          }
          next(err);
        });
    }
  }).catch((err) => {
    next(err);
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_TOKEN, { expiresIn: '7d' });
      return res
        .cookie('jwt', token, { httpOnly: true, sameSite: true })
        .status(200).send({
          email: user.email,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
        });
    })
    .catch(() => {
      next(new AuthError('Ошибка доступа'));
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.getСurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка, пользователь не найден');
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError('Некорректныe данные'));
      } else {
        next(err);
      }
    });
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError('Ошибка, пользователь по указанному _Id не найден'));
      }
      return res.status(200).send({ user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка, пользователь не найден');
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new CastError('Введены некорректные данные');
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Ошибка, пользователь не найден');
      }
      return res.send({ data: user });
    }).catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new CastError('Введены некорректные данные');
      }
      next(err);
    });
};
