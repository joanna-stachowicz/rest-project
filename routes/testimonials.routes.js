const express = require('express');
const TestimonialController = require('../controllers/testimonial.controller');
const router = express.Router();

const app = express();

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/random', TestimonialController.getRandom);

router.get('/testimonials/:id', TestimonialController.getOne);

router.post('/testimonials', TestimonialController.addAll);

router.put('/testimonials/:id', TestimonialController.changeOne);

router.delete('/testimonials/:id', TestimonialController.deleteOne);

module.exports = router;