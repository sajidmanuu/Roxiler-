import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../models/user.model.js';
import { validateEmail, validatePassword, validateName, validateAddress } from '../utils/validators.js';

export const register = (req, res) => {
    req.body.role="user";
  const { name, email, address, password, role } = req.body;
  console.log(req.body);
  
  if (!validateName(name) || !validateAddress(address) || !validatePassword(password) || !validateEmail(email)) {
    return res.status(400).json({ message: 'Validation failed' });
  }
  const hashedPassword = bcrypt.hashSync(password, 8);
  createUser({ name, email, address, password: hashedPassword, role }, (err) => {
    if (err){
        console.log(err);
        
        return res.status(500).json({ message: 'Registration failed' });
    }
     
    res.status(201).json({ message: 'User registered successfully' });
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });
    const user = results[0];
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  });
};