import express from 'express';
import {
  createProperty,
  getAllProperties,
  getPropertyById,
  addToFavourites,
  getUserFavourites,
  searchProperties,
  getMyProperties,
  deleteFavourite
} from '../controllers/property.controller.js';

import { protect } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = express.Router();

// Create new property (seller only)
router.post('/add-new', protect, upload.array('images', 5), createProperty);


//search properties
router.post("/search", searchProperties);

// Get all properties
router.get('/', getAllProperties);


router.get('/favourites', protect, getUserFavourites);
router.delete("/delete/favourite/:id", protect, deleteFavourite)
// Get property by ID
router.get('/:id', getPropertyById);



// Add to favourites
router.post('/favourite/:id', protect, addToFavourites);

// Get user favourites

// Get all properties created by the logged-in user
router.get('/my-properties', protect, getMyProperties);

export default router;
