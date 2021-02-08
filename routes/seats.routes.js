const express = require('express');
const SeatController = require('../controllers/seat.controller');
const router = express.Router();

const app = express();

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getOne);

router.post('/seats', SeatController.addAll);

router.put('/seats/:id', SeatController.changeOne);

router.delete('/seats/:id', SeatController.deleteOne);

module.exports = router;