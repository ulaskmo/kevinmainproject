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
export const createMovie = async (req: Request, res: Response) => {
    const db = getDb();
    const newMovie: Movie = req.body;
    const result = await db.collection('movies').insertOne(newMovie);
    res.json(result);
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
