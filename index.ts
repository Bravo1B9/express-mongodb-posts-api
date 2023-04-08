require('dotenv').config();
import { connectToDatabase } from "./db";
import postRoutes from "./router/postRouter";
const express = require('express');

const port = process.env.PORT;

connectToDatabase();

const app = express();
app.use(express.json());

app.use('/', postRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});