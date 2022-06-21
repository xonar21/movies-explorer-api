const router = require('express').Router();

const userRouter = require('./users');

const movieRouter = require('./movies');

const auth = require('../middlewares/auth');

const { login, createUser } = require('../controllers/users');

const { celebrate, Joi } = require('celebrate');

// const { registerValid, loginValid } = require('../middlewares/validation');

const ErrorNotFound = require('../errors/errorNotFound');

// router.post('/signup', registerValid, createUser);

// router.post('/signin', loginValid, login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new ErrorNotFound('Данный путь не найден'));
});

module.exports = router;
