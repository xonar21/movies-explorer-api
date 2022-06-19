const router = require('express').Router();

const
  {
    updateUser,
    userInfo,
  } = require('../controllers/users');

router.get('/me', userInfo);
router.patch('/me', updateUser);

module.exports = router;
