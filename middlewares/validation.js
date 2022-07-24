const { celebrate, Joi, Segments } = require('celebrate');

const userValid = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const movieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(50),
    director: Joi.string().required().min(2).max(50),
    duration: Joi.number().required().min(1).max(10000),
    year: Joi.string().required().min(1).max(10),
    description: Joi.string().required().min(1).max(10000),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().required().min(1).max(100),
    nameRU: Joi.string().required().min(1).max(70),
    nameEN: Joi.string().required().min(1).max(70),
  }),
});

const parameterIdValid = (nameId) => celebrate({
  params: Joi.object().keys({
    [nameId]: Joi.string().hex().length(24),
  }),
});

module.exports = {
  movieValid,
  parameterIdValid,
  userValid,
};
