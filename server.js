import express from 'express';
const app = express();
const port = 8080;
import cors from 'cors';

// app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.get('/', (req, res) => {
    res.send('Hello World!');
});

let api = [
    {
      "name": "Get User",
      "endpoint": "https://api.example.com/users",
      "method": "GET",
      "headers": {
        "Authorization": "Bearer TOKEN"
      },
      "parameters": [
        {
          "name": "userId",
          "type": "number"
        }
      ]
    },
    {
      "name": "Create Post",
      "endpoint": "https://api.example.com/posts",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer TOKEN"
      },
      "parameters": [
        {
          "name": "title",
          "type": "text"
        },
        {
          "name": "content",
          "type": "textarea"
        }
      ]
    }
]
app.get("/api/apis", (req, res) => {
    res.send(api);
});

// Wildcard
app.get("*", (req, res) => {
    res.status(404).send("<h2><i>Hello World</i></h2>");
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});