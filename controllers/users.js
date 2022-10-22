const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const ErrorNotFound = require('../errors/errorNotFound');

const ErrorBadRequest = require('../errors/errorBadRequest');

const ErrorConflict = require('../errors/errorConflict');

const Unauthorized = require('../errors/Unauthorized');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(res, email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'dev-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.status(200).send({ message: 'Авторизация успешна', token });
    })
    .catch(() => {
      next(new Unauthorized('Не правильный логин или пароль'));
    });
};

module.exports.userInfo = (req, res, next) => {
  User.findById(req.user._id)

    .then((user) => {
      if (!user._id) {
        next(new ErrorNotFound('Пользователь не найден'));
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ErrorConflict('Пользователь с таким email уже зарегистрирован'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные.'));
      } else if (err.code === 11000) {
        next(new ErrorConflict('Пользователь уже существует'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {

  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные при создании пользователя.'));
      } else if (err.codeName === 'DuplicateKey') {
        next(new ErrorConflict('Пользователь с таким email уже зарегистрирован'));
      } else {
        next(err);
      }
    });
};
