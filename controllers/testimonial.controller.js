const Testimonial = require('../models/testimonial.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Testimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const dep = await Testimonial.findOne().skip(rand);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getOne = async (req, res) => {
  try {
    const item = {
      author: req.body.author,
      text: req.body.text
    };
    const newTestimonial = new Testimonial(item);
    await newTestimonial.save();
    res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addAll = async (req, res) => {
  try {
    const tes = await (Testimonial.findById(req.params.id));
    if (tes) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json(tes);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.changeOne = async (req, res) => {
  try {
    const dep = await Testimonial.findById(req.params.id);
    if (!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const tes = await (Testimonial.findById(req.params.id));
    if (tes) {
      const item = {
        author: req.body.author,
        text: req.body.text
      };
      await Testimonial.updateOne({ _id: req.params.id }, { $set: item });
      const newTes = await (Testimonial.findById(req.params.id));
      res.json(newTes);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};