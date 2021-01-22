const express = require('express');
const router = express.Router();
const db = require('./../db');

const app = express();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  for (let i = 0; i < db.seats.length; i++) {
    const item = db.seats[i];
    if (item.id == req.params.id) {
      res.json(item);
      break;
    }
  }
  res.json({});
});

router.route('/seats').post((req, res) => {
  const randomId = Math.floor(Math.random() * 9999);
  const item = {
    id: randomId,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email
  };
  db.seats.push(item);
  res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
  for (let i = 0; i < db.seats.length; i++) {
    const item = db.seats[i];
    if (item.id == req.params.id) {
      const newItem = {
        id: item.id,
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email
      };
      db.seats[i] = newItem;
      break;
    }
  }
  res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
  for (let i = 0; i < db.seats.length; i++) {
    const item = db.seats[i];
    if (item.id == req.params.id) {
      db.seats.splice(i, 1);
      break;
    }
  }
  res.json({ message: 'OK' });
});

module.exports = router;