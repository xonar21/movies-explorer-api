const router = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies')

router.post('/', createMovie);
router.get('/', getMovies);
router.delete('/:id', deleteMovie);

module.exports = router;