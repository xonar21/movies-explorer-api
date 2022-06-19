require('dotenv').config();

const express = require('express');

const { errors } = require('celebrate');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const cors = require('cors');

const auth = require('./middlewares/auth');

const errHandler = require('./middlewares/errHandler');

const error = require('./routes/error');

const { registerValid, loginValid } = require('./middlewares/validation');

const { login, createUser } = require('./controllers/users');

const { requestLogger, errorLogger } = require('./middlewares/loger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', registerValid, createUser);

app.post('/signin', loginValid, login);

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', { useNewUrlParser: true });

app.use(auth);

app.use(errorLogger);

app.use(error);

app.use(errors());

app.use(errHandler);

app.listen(PORT);