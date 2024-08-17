
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const restaurantRoutes = require('./routes/restaurant');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Use the restaurant and auth routes
app.use('/api', restaurantRoutes);
app.use('/api', authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
