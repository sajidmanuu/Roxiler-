import { getAllUsers } from '../models/user.model.js';

export const listUsers = (req, res) => {
  getAllUsers(req.query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error retrieving users' });
    res.status(200).json(results);
  });
};
