import express, {Application, Request, Response} from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config';
import { connectDatabase } from './database/mongodb';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';
import adminRoutes from './routes/admin.route';

import path from 'path';

import blogRouter from './routes/blog.route';
import adminBlogRouter  from './routes/admin/blog.route';


dotenv.config();
// Yo bhanda tala .env chalauna milxa
console.log(process.env.PORT); // [yo port is from .env file]

const app: Application = express();
// const PORT: number = 3000;

let corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3003"],
    // which url can access backend
    // put your frontend domain/url here
}
// origin: "+", // yo le sabai url lai access dinxa
app.use(cors(corsOptions));


app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // static file serving

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/admin/users', adminRoutes);
app.use('/api/blogs', blogRouter);
app.use('/api/admin/users', adminUserRoute);

export default app;
