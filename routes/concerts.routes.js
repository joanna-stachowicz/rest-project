const express = require('express');
const router = express.Router();
const db = require('./../db');

const app = express();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  for (let i = 0; i < db.concerts.length; i++) {
    const item = db.concerts[i];
    if (item.id == req.params.id) {
      res.json(item);
      break;
    }
  }
  res.json({});
});

router.route('/concerts').post((req, res) => {
  const randomId = Math.floor(Math.random() * 9999);
  const item = {
    id: randomId,
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  };
  db.concerts.push(item);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  for (let i = 0; i < db.concerts.length; i++) {
    const item = db.concerts[i];
    if (item.id == req.params.id) {
      const newItem = {
        id: item.id,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image
      };
      db.concerts[i] = newItem;
      break;
    }
  }
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  for (let i = 0; i < db.concerts.length; i++) {
    const item = db.concerts[i];
    if (item.id == req.params.id) {
      db.concerts.splice(i, 1);
      break;
    }
  }
  res.json({ message: 'OK' });
});

module.exports = router;