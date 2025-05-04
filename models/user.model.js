import db from '../config/db.js';

export const createUser = (user, callback) => {
  const sql = 'INSERT INTO users (name, email, address, password, role) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [user.name, user.email, user.address, user.password, user.role], callback);
};

export const findUserByEmail = (email, callback) => {
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], callback);
};

export const getAllUsers = (filters, callback) => {
  let sql = 'SELECT * FROM users WHERE 1=1';
  const values = [];
  if (filters.name) {
    sql += ' AND name LIKE ?';
    values.push(`%${filters.name}%`);
  }
  if (filters.email) {
    sql += ' AND email LIKE ?';
    values.push(`%${filters.email}%`);
  }
  if (filters.address) {
    sql += ' AND address LIKE ?';
    values.push(`%${filters.address}%`);
  }
  if (filters.role) {
    sql += ' AND role = ?';
    values.push(filters.role);
  }
  db.query(sql, values, callback);
};