// Store routes
import express from 'express';
import { addStore, listStores, rateStore, myRating, storeOwnerDashboard } from '../controllers/store.controller.js';
import { authenticate, authorizeRoles } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authenticate, authorizeRoles('admin'), addStore);
router.get('/', authenticate, listStores);
router.post('/rate', authenticate, authorizeRoles('user'), rateStore);
router.get('/:storeId/my-rating', authenticate, myRating);
router.get('/owner/dashboard', authenticate, authorizeRoles('owner'), storeOwnerDashboard);

export default router;