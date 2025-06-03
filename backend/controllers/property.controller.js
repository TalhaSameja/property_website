import { Property } from '../models/property.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../Utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import cloudinary from 'cloudinary';

// CREATE Property
export const createProperty = asyncHandler(async (req, res) => {
  const { title, description, price, propertyType, bedrooms, bathrooms, sqft, address } = req.body;

  if (!title || !description || !price ||  !address|| !propertyType) {
    throw new ApiError(400, 'All fields are required');
  }

  const images = [];
  console.log(req.files)
 
  for (const file of req.files) {
  const base64String = file.buffer.toString("base64");
  const dataURI = `data:${file.mimetype};base64,${base64String}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: 'real-estate/properties',
  });

  images.push(result.secure_url);
}


  const property = await Property.create({
    title,
    description,
    price,
    location : address,
    propertyType,
    bathrooms,
    bedrooms,
    images,
    sqft,
    createdBy: req.user._id,
  });

  res.status(201).json(new ApiResponse(201, property, 'Property created successfully'));
});

// GET All Properties
export const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find().populate('createdBy', 'name email');
  res.status(200).json(new ApiResponse(200, properties, 'All properties fetched'));
});

// GET Single Property by ID
export const getPropertyById = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id).populate('createdBy', 'name email phone');
  if (!property) throw new ApiError(404, 'Property not found');
  res.status(200).json(new ApiResponse(200, property));
});


// ADD to Favourites
export const addToFavourites = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;
  const user = await User.findById(req.user._id);
  console.log(user)

  const index = user.favourites.indexOf(propertyId);
  if (index === -1) {
    user.favourites.push(propertyId);
    await user.save();
    res.status(200).json(new ApiResponse(200, null, 'Added to favourites'));
  } else {
    user.favourites.splice(index, 1);
    await user.save();
    res.status(200).json(new ApiResponse(200, null, 'Removed from favourites'));
  }
});

// GET User Favourites
export const getUserFavourites = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('favourites');
  console.log(user)
  res.status(200).json(new ApiResponse(200, user.favourites, 'Favourite properties fetched'));
});

// SEARCH Properties
export const searchProperties = asyncHandler(async (req, res) => {
  const { min, max } = req.body;

  // Build a price-range query
  const priceFilter = {};
  if (min !== undefined) {
    priceFilter.$gte = Number(min);
  }
  if (max !== undefined) {
    priceFilter.$lte = Number(max);
  }

  // Only add the price field if at least one bound is present
  const query = {};
  if (Object.keys(priceFilter).length) {
    query.price = priceFilter;
  }

  // Fetch properties matching the price criteria
  const properties = await Property.find(query).populate('createdBy', 'name email');

  res.status(200).json(new ApiResponse(200, properties, 'Properties filtered by price range'));
});


// GET Properties Created by Logged-in User
export const getMyProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find({ createdBy: req.user._id });
  res.status(200).json(new ApiResponse(200, properties, 'User properties fetched successfully'));
});


export const deleteFavourite = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Remove the property ID from favourites
  user.favourites.pull(propertyId);
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Property removed from favourites',
    favourites: user.favourites,
  });
});

