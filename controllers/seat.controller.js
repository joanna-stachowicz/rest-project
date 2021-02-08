const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const dep = await Seat.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addAll = async (req, res) => {
  try {
    const item = {
      day: req.body.day,
      seat: req.body.seat,
      client: req.body.client,
      email: req.body.email
    };
    const sea = await Seat.findOne({ day: item.day, seat: item.seat });
    if (sea) {
      res.status(409).json({ message: "The slot is already taken..." });
    } else {
      const newSeat = new Seat(item);
      await newSeat.save();
      res.json({ message: 'OK' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  try {
    const sea = await (Seat.findById(req.params.id));
    if (sea) {
      const item = {
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email
      }
      await Seat.updateOne({ _id: req.params.id }, { $set: item });
      const newSeat = await (Seat.findById(req.params.id));
      res.json(newSeat);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const sea = await (Seat.findById(req.params.id));
    if (sea) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(sea);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};