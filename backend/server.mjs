import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './db.mjs';

const app = express();
app.use(express.json());

await connectDB();

app.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});