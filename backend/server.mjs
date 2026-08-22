import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './db.mjs';

const app = express();
app.use(express.json());

await connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post('/artworks', async (req, res) => {
  const {uploaderId, image } = req.body;

  const newArtwork = { id: Date.now(), uploaderId, image };

  await db.collection('artworks').insertOne(artwork);
  res.json({ success: true });
});

app.post('/artworks/:artworkId/comments', async (req, res) => {
  const { artworkId } = req.params;
  const { giverId, text } = req.body;

  try {
    const result = await db.collection('artworks').updateOne(
      { _id: new ObjectId(artworkId) },
      {
        $push: {
          comments: {
            giverId: new ObjectId(giverId),
            text: text,
            createdAt: new Date()
          }
        }
      }
    );

    res.json({ success: true, message: 'Comment added' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});