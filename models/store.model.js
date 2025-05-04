import db from '../config/db.js';

export const createStore = (store, callback) => {
  const sql = 'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [store.name, store.email, store.address, store.owner_id], callback);
};

export const getAllStores = (filters, callback) => {
  let sql = `SELECT s.*, COALESCE(AVG(r.rating), 0) AS avg_rating
             FROM stores s
             LEFT JOIN ratings r ON s.id = r.store_id
             WHERE 1=1`;
  const values = [];
  if (filters.name) {
    sql += ' AND s.name LIKE ?';
    values.push(`%${filters.name}%`);
  }
  if (filters.address) {
    sql += ' AND s.address LIKE ?';
    values.push(`%${filters.address}%`);
  }
  sql += ' GROUP BY s.id';
  db.query(sql, values, callback);
};

export const submitRating = (userId, storeId, rating, callback) => {
  const sql = `INSERT INTO ratings (user_id, store_id, rating) 
               VALUES (?, ?, ?) 
               ON DUPLICATE KEY UPDATE rating = ?`;
  db.query(sql, [userId, storeId, rating, rating], callback);
};

export const getUserRating = (userId, storeId, callback) => {
  const sql = 'SELECT rating FROM ratings WHERE user_id = ? AND store_id = ?';
  db.query(sql, [userId, storeId], callback);
};

export const getStoreRatingsByOwner = (ownerId, callback) => {
  const sql = `SELECT u.name, u.email, r.rating FROM ratings r
               JOIN users u ON r.user_id = u.id
               JOIN stores s ON r.store_id = s.id
               WHERE s.owner_id = ?`;
  db.query(sql, [ownerId], callback);
};

export const getStoreAverageRating = (ownerId, callback) => {
  const sql = `SELECT AVG(r.rating) as avg_rating FROM ratings r
               JOIN stores s ON r.store_id = s.id
               WHERE s.owner_id = ?`;
  db.query(sql, [ownerId], callback);
};