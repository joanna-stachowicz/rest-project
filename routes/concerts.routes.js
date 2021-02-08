const express = require('express');
const ConcertController = require('../controllers/concert.controller');
const router = express.Router();

const app = express();

router.get('/concerts', ConcertController.getAll);

router.get('/concerts/:id', ConcertController.getOne);

router.post('/concerts', ConcertController.addAll);

router.put('/concerts/:id', ConcertController.changeOne);

router.delete('/concerts/:id', ConcertController.deleteOne);

module.exports = router;