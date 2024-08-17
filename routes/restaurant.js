
const express = require('express');
const Restaurant = require('../models/Restaurant');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create a restaurant
router.post('/restaurants', authMiddleware, async (req, res) => {
  const { name, description, location, ratings } = req.body;
  try {
    const restaurant = new Restaurant({ name, description, location, ratings });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).send('Error creating restaurant');
  }
});

// Get restaurants based on latitude, longitude, and radius
router.get('/restaurants', authMiddleware, async (req, res) => {
  const { latitude, longitude, radius } = req.query;
  try {
    const restaurants = await Restaurant.find({
      location: {
        $geoWithin: {
          $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], radius / 6378100]
        }
      }
    });
    res.status(200).json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(400).send('Error retrieving restaurants');
  }
});

// Get restaurants within a range of distances
router.get('/restaurants/range', authMiddleware, async (req, res) => {
  const { latitude, longitude, minimumDistance, maximumDistance } = req.query;
  try {
    // Convert distances from meters to radians
    const minDistanceInRadians = minimumDistance / 6378100;
    const maxDistanceInRadians = maximumDistance / 6378100;

    const restaurants = await Restaurant.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(longitude), parseFloat(latitude)],
            maxDistanceInRadians
          ]
        }
      }
    }).where('location.coordinates').near({
      center: [parseFloat(longitude), parseFloat(latitude)],
      minDistance: minDistanceInRadians,
      maxDistance: maxDistanceInRadians
    });

    res.status(200).json(restaurants);
  } catch (err) {
    console.error('Error details:', err);
    res.status(400).send('Error retrieving restaurants in range');
  }
});

// Update a restaurant
router.put('/restaurants/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { name, description, location, ratings } = req.body;
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { name, description, location, ratings },
      { new: true }
    );
    if (!restaurant) return res.status(404).send('Restaurant not found');
    res.status(200).json(restaurant);
  } catch (err) {
    res.status(400).send('Error updating restaurant');
  }
});

// Delete a restaurant
router.delete('/restaurants/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (!restaurant) return res.status(404).send('Restaurant not found');
    res.status(200).send('Restaurant deleted');
  } catch (err) {
    res.status(400).send('Error deleting restaurant');
  }
});

module.exports = router;
