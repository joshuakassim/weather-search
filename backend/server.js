import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/routes.js';

const port = process.env.PORT || 5000;

app.use(cors());

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes for handling requests
app.use('/api', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

// Middleware to handle not found routes and MongoDB 'Cast Error'
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
