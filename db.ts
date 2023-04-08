import { MongoClient } from 'mongodb';
require('dotenv').config();

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

export let postCollection: any;

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB!');
    postCollection = client.db('database').collection('posts');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

export { connectToDatabase };
