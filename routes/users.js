const router = require('express').Router();

const {
  userValid,
} = require('../middlewares/validation');

const
  {
    updateUser,
    userInfo,
  } = require('../controllers/users');

router.get('/me', userInfo);
router.patch('/me', userValid, updateUser);

module.exports = router;
