const express = require('express');
const router = express.Router();
const Slot = require('../models/Slot');


router.get('/', async (req, res) => {
  const slots = await Slot.find();
  res.json(slots);
});


router.post('/', async (req, res) => {
  const slot = new Slot(req.body);
  await slot.save();
  res.status(201).json(slot);
});


router.patch('/:id', async (req, res) => {
  const updated = await Slot.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;
