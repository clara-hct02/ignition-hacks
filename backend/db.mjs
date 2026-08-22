import { MongoClient } from 'mongodb';

let client;

export async function connectDB() {
  try {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    return client;
  } catch (error) {
    console.error('Failed to connect:', error);
    process.exit(1);
  }
}

export default client;