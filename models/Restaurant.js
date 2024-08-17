
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  ratings: [{ type: Number }]
});

// Ensure 2dsphere index is created on the location field
restaurantSchema.index({ location: '2dsphere' });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
