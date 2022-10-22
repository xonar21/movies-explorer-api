const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const Unauthorized = require('../errors/Unauthorized');

module.exports = (req, res, next) => {
  console.log(req.rawHeaders)
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      'dev-secret',
    );
  } catch (err) {
    return next(new Unauthorized('Доступ запрещен'));
  }

  req.user = payload;

  return next();
};
