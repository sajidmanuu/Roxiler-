import express from 'express';
import { listUsers } from '../controllers/user.controller.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('admin'), listUsers);

export default router;