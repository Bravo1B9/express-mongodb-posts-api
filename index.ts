require('dotenv').config();
import { connectToDatabase } from "./db";
const express = require('express');

const port = process.env.PORT;

const app = express();

connectToDatabase();

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});