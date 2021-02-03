const express = require('express');
const router = express.Router();
const db = require('./../db');

const app = express();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  const result = db.seats.filter(seat => seat.id == req.params.id);
  if (result.length === 0) {
    res.json({});
  } else {
    res.json(result[0]);
  }
});

router.route('/seats').post((req, res) => {
  const randomId = Math.floor(Math.random() * 9999);
  const newSeat = {
    id: randomId,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email
  };

  const isTaken = db.seats.some((seat) => {
    if (seat.day == newSeat.day && seat.seat == newSeat.seat) {
      return true;
    } else {
      return false;
    }
  });

  if (isTaken) {
    res.status(409).json({ message: "The slot is already taken..." });
  } else {
    db.seats.push(newSeat);
    res.json({ message: 'OK' });
    req.io.emit('seatsUpdated', db.seats);
  }
});

router.route('/seats/:id').put((req, res) => {
  db.seats = db.seats.map(seat => {
    if (seat.id == req.params.id) {
      return newSeat = {
        id: seat.id,
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email
      }
    } else {
      return seat;
    }
  });
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