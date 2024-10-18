import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import Movie from '../models/movie';
import { getDb } from '../database';

// Get all movies
export const getMovies = async (req: Request, res: Response) => {
    const db = getDb();
    const movies = await db.collection('movies').find().toArray();
    res.json(movies);
};

// Create a new movie
export const createMovie = async (req: Request, res: Response): Promise<void> => {
    const db = getDb();
    const { title, director, genre, year, rentalPrice, availableCopies } = req.body;

    // Validate the presence of required fields
    if (!title || !director || !genre || !year || !rentalPrice || !availableCopies) {
        res.status(400).json({ error: "All fields (title, director, genre, year, rentalPrice, availableCopies) are required." });
        return;
    }

    // Additional validation (e.g., checking data types)
    if (typeof year !== 'number' || typeof rentalPrice !== 'number' || typeof availableCopies !== 'number') {
        res.status(400).json({ error: "Year, rentalPrice, and availableCopies must be numbers." });
        return;
    }

    try {
        const newMovie: Movie = { title, director, genre, year, rentalPrice, availableCopies };
        const result = await db.collection('movies').insertOne(newMovie);
        res.status(201).json(result);  // Send back success response
    } catch (error) {
        res.status(500).json({ error: "Failed to create the movie." });
    }
};


// Update movie by ID
export const updateMovie = async (req: Request, res: Response) => {
    const db = getDb();
    const { id } = req.params;
    const updatedMovie: Partial<Movie> = req.body;
    const result = await db.collection('movies').updateOne({ _id: new ObjectId(id) }, { $set: updatedMovie });
    res.json(result);
};

// Delete movie by ID
export const deleteMovie = async (req: Request, res: Response) => {
    const db = getDb();
    const { id } = req.params;
    const result = await db.collection('movies').deleteOne({ _id: new ObjectId(id) });
    res.json(result);
};

//get movie by id
export const getMovieById = async (req: Request, res: Response): Promise<void> => {
    const db = getDb();
    const { id } = req.params;

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
        res.status(400).json({ error: 'Invalid ID format' });
        return;
    }

    try {
        const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });
        if (!movie) {
            res.status(404).json({ error: 'Movie not found' });
            return;
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve movie' });
    }
};

// Delete the most recently added movie
export const deleteLastMovie = async (req: Request, res: Response): Promise<void> => {
    const db = getDb();

    try {
        // Find the most recent movie by sorting by _id in descending order
        const lastMovie = await db.collection('movies').findOne({}, { sort: { _id: -1 } });

        if (!lastMovie || !lastMovie._id) {
            res.status(404).json({ error: 'No movies found to delete.' });
            return;
        }

        // Validate the _id before using it
        const movieId = lastMovie._id;
        if (!ObjectId.isValid(movieId)) {
            res.status(400).json({ error: 'Invalid movie ID format.' });
            return;
        }

        // Delete the most recent movie
        await db.collection('movies').deleteOne({ _id: new ObjectId(movieId) });

        res.json({ message: 'Last movie deleted successfully', movie: lastMovie });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete the last movie.' });
    }
};