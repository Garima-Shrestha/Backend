import express, {Application, Request, Response} from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config';
import { connectDatabase } from './database/mongodb';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route';
import bookRoutes from './routes/book.route';


dotenv.config();
// Yo bhanda tala .env chalauna milxa
console.log(process.env.PORT); // [yo port is from .env file]

const app: Application = express();
// const PORT: number = 3000;

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

async function start(){
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`Server: http://localhost:${PORT}`);
    })
}

start().catch((error) => console.log(error));