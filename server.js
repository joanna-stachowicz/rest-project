const express = require('express');

const app = express();

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cors({
//   "origin": "https://kodilla.com", //origin sets domains that we approve
//   "methods": "GET,POST", //we allow only GET and POST methods
// }));

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const randomId = Math.floor(Math.random() * db.length);
  console.log(randomId);
  const item = db[randomId];
  res.json(item);
});

app.get('/testimonials/:id', (req, res) => {
  for (let i = 0; i < db.length; i++) {
    const item = db[i];
    if (item.id == req.params.id) {
      res.json(item);
      break;
    }
  }
  res.json({});
});

app.post('/testimonials', (req, res) => {
  const randomId = Math.floor(Math.random() * 9999);
  const item = { id: randomId, author: req.body.author, text: req.body.text };
  db.push(item);
  res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  for (let i = 0; i < db.length; i++) {
    const item = db[i];
    if (item.id == req.params.id) {
      const newItem = { id: item.id, author: req.body.author, text: req.body.text };
      db[i] = newItem;
      break;
    }
  }
  res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  for (let i = 0; i < db.length; i++) {
    const item = db[i];
    if (item.id == req.params.id) {
      db.splice(i, 1);
      break;
    }
  }
  res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json('Not found...');
})

