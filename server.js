require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const slotRoutes = require('./routes/slots');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Mongo error:', err));

app.use('/api/slots', slotRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
