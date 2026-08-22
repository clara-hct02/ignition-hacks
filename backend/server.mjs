import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './db.mjs';
import User from './models/User.js';


const app = express();
app.use(express.json());

await connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});