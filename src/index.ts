import express from 'express';
import dotenv from 'dotenv';
import { connectToDb } from './database';
import movieRoutes from './routes/movieRoutes';
import customerRoutes from './routes/customerRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(
    cors({
        origin: 'http://localhost:4200',
        methods: ['GET','POST','PUT','DELETE'],
        credentials: true,
    })
);

app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/customers', customerRoutes); //not available yet, will be future 

const PORT = process.env.PORT || 3000;


connectToDb(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
