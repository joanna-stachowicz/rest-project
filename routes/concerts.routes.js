const express = require('express');
const router = express.Router();
const db = require('./../db');

const app = express();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  const result = db.concerts.filter(concert => concert.id == req.paramms.id);
  if (result.length === 0) {
    res.json({});
  } else {
    res.json(result[0]);
  }
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
  db.concerts = db.concerts.map(concert => {
    if (concert.id == req.params.id) {
      return newConcert = {
        id: concert.id,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image
      }
    } else {
      return concert;
    }
  });
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