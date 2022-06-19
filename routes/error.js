const router = require('express').Router();

const users = require('./users');

const movies = require('./movies');

const ErrorNotFound = require('../errors/errorNotFound');

router.use('/users', users);
router.use('/movies', movies);

router.use((req, res, next) => {
  next(new ErrorNotFound('Данный путь не найден'));
});

module.exports = router;
