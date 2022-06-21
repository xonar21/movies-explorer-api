const userRouter = require('express').Router();

const {
  userValid,
} = require('../middlewares/validation');

const
  {
    updateUser,
    userInfo,
  } = require('../controllers/users');

userRouter.get('/me', userInfo);
userRouter.patch('/me', userValid, updateUser);

module.exports = userRouter;
