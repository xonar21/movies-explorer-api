const router = require('express').Router();

const {
  parameterIdValid,
} = require('../middlewares/validation');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies')

router.post('/', createMovie);
router.get('/', getMovies);
router.delete('/:id', parameterIdValid, deleteMovie);

module.exports = router;