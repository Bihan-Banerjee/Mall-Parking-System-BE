const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  number: String,
  type: {
    type: String,
    enum: ['Regular', 'Compact', 'Bike', 'EV', 'Accessible']
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Maintenance'],
    default: 'Available'
  },
  assignedTo: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Slot', slotSchema);
