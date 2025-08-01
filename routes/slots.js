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
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) return res.status(404).json({ error: 'Slot not found' });
    if (req.body.assignedTo && slot.assignedTo && slot.status === 'Occupied') {
      return res.status(400).json({
        error: `Cannot assign vehicle. Slot is already occupied by ${slot.assignedTo}.`
      });
    }


    Object.assign(slot, req.body);
    await slot.save();
    res.json(slot);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  await Slot.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
