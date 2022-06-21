const movieRouter = require('express').Router();

const {
  movieValid,
  parameterIdValid,
} = require('../middlewares/validation');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

movieRouter.post('/',movieValid, createMovie);
movieRouter.get('/', getMovies);
movieRouter.delete('/:id', parameterIdValid('id'), deleteMovie);

module.exports = movieRouter;
