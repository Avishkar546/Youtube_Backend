import dotenv from 'dotenv';
import { connectToDB } from './src/db/connection.db.js';
import { app } from './src/app.js';

dotenv.config();

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

connectToDB()
  .then(() => {
    app.on('error', (err) => {
      console.log('Error: ' + err.message);
      throw err;
    });

    // console.log(process.env.PORT);
    app.listen(8080, () => {
      console.log(`Example app listening on port ${8080}`);
    });
  })
  .catch(err => {
    console.log('MONGODB connection FAILED: ', err);
  })