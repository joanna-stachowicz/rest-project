const express = require('express');
const router = express.Router();
const db = require('./../db');

const app = express();

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

router.route('/testimonials/random').get((req, res) => {
  const randomId = Math.floor(Math.random() * db.testimonials.length);
  console.log(randomId);
  const item = db.testimonials[randomId];
  res.json(item);
});

router.route('/testimonials/:id').get((req, res) => {
  const result = db.testimonials.filter(testimonial => testimonial.id == req.params.id);
  if (result.length === 0) {
    res.json({});
  } else {
    res.json(result[0]);
  }
});

router.route('/testimonials').post((req, res) => {
  const randomId = Math.floor(Math.random() * 9999);
  const item = { id: randomId, author: req.body.author, text: req.body.text };
  db.testimonials.push(item);
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').put((req, res) => {
  db.testimonials = db.testimonials.map(testimonial => {
    if (testimonial.id == req.params.id) {
      return newTestimonial = {
        id: testimonial.id,
        author: req.body.author,
        text: req.body.text
      }
    } else {
      return testimonial;
    }
  });
  res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
  for (let i = 0; i < db.testimonials.length; i++) {
    const item = db.testimonials[i];
    if (item.id == req.params.id) {
      db.testimonials.splice(i, 1);
      break;
    }
  }
  res.json({ message: 'OK' });
});

module.exports = router;