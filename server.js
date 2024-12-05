import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDB } from './src/db/connection.db.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());
// app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.send('Youtube video app!');
});


// DB Connection for practice
// ; (async () => {
//   mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     .then(async res => {
//       let response = await res.json();
//       console.log("Response : " + response);
//       console.log("MongoDB connected successfully");
//     })
//     .catch(error => {
//       console.log(error.message);
//       throw error;
//     })
// })()

await connectToDB();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
});