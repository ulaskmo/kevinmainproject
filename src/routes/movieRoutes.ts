import express from 'express';
import { getMovies, createMovie, updateMovie, deleteMovie, getMovieById } from '../controllers/movieController';

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovieById);  // Correct usage here
router.post('/', createMovie);
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

export default router;
