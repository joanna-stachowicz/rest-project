const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const dep = await Concert.findById(req.params.id);
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
      performer: req.body.performer,
      genre: req.body.genre,
      price: req.body.price,
      day: req.body.day,
      image: req.body.image
    };
    const newConcert = new Concert(item);
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  try {
    const con = await (Concert.findById(req.params.id));
    if (con) {
      const item = {
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image
      };
      await Concert.updateOne({ _id: req.params.id }, { $set: item });
      const newCon = await (Concert.findById(req.params.id));
      res.json(newCon);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const con = await (Concert.findById(req.params.id));
    if (con) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(con);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};



