import { createStore, getAllStores, submitRating, getUserRating, getStoreRatingsByOwner, getStoreAverageRating } from '../models/store.model.js';

export const addStore = (req, res) => {
  createStore(req.body, (err) => {
    if (err) return res.status(500).json({ message: 'Error adding store' });
    res.status(201).json({ message: 'Store added successfully' });
  });
};

export const listStores = (req, res) => {
  getAllStores(req.query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error retrieving stores' });
    res.status(200).json(results);
  });
};

export const rateStore = (req, res) => {
  const { storeId, rating } = req.body;
  submitRating(req.user.id, storeId, rating, (err) => {
    if (err) return res.status(500).json({ message: 'Rating failed' });
    res.status(200).json({ message: 'Rating submitted successfully' });
  });
};

export const myRating = (req, res) => {
  getUserRating(req.user.id, req.params.storeId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching rating' });
    res.status(200).json(results[0] || {});
  });
};

export const storeOwnerDashboard = (req, res) => {
  getStoreRatingsByOwner(req.user.id, (err, ratings) => {
    if (err) return res.status(500).json({ message: 'Error fetching ratings' });
    getStoreAverageRating(req.user.id, (avgErr, avgResults) => {
      if (avgErr) return res.status(500).json({ message: 'Error fetching average' });
      res.status(200).json({ ratings, average: avgResults[0].avg_rating });
    });
  });
};
