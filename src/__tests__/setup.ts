import { connectDatabase } from '../database/mongodb';
import mongoose from 'mongoose';

beforeAll(async () => {
    // can use uuid to conntect test database
    await connectDatabase();
});

afterAll(async () => {
    await mongoose.connection.close();
});