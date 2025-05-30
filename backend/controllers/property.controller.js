import { Property } from '../models/property.model.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../Utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import cloudinary from 'cloudinary';

// CREATE Property
export const createProperty = asyncHandler(async (req, res) => {
  const { title, description, price, location, category } = req.body;

  if (!title || !description || !price || !location || !category) {
    throw new ApiError(400, 'All fields are required');
  }

  const images = [];

  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'real-estate/properties',
    });
    images.push({ url: result.secure_url, public_id: result.public_id });
  }

  const property = await Property.create({
    title,
    description,
    price,
    location,
    category,
    images,
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
  const property = await Property.findById(req.params.id).populate('createdBy', 'name email');
  if (!property) throw new ApiError(404, 'Property not found');
  res.status(200).json(new ApiResponse(200, property));
});

// DELETE Property
export const deleteProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) throw new ApiError(404, 'Property not found');

  if (property.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError(403, 'Not authorized to delete this property');
  }

  for (const img of property.images) {
    await cloudinary.uploader.destroy(img.public_id);
  }

  await property.deleteOne();

  res.status(200).json(new ApiResponse(200, null, 'Property deleted successfully'));
});

// UPDATE Property
export const updateProperty = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.params.id);
  if (!property) throw new ApiError(404, 'Property not found');

  if (property.createdBy.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not authorized to update this property');
  }

  const { title, description, price, location, category } = req.body;
  if (title) property.title = title;
  if (description) property.description = description;
  if (price) property.price = price;
  if (location) property.location = location;
  if (category) property.category = category;

  if (req.files.length > 0) {
    for (const img of property.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    const newImages = [];
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: 'real-estate/properties',
      });
      newImages.push({ url: result.secure_url, public_id: result.public_id });
    }

    property.images = newImages;
  }

  await property.save();
  res.status(200).json(new ApiResponse(200, property, 'Property updated successfully'));
});

// ADD to Favourites
export const addToFavourites = asyncHandler(async (req, res) => {
  const propertyId = req.params.id;
  const user = await User.findById(req.user._id);

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
  res.status(200).json(new ApiResponse(200, user.favourites, 'Favourite properties fetched'));
});

// SEARCH Properties
export const searchProperties = asyncHandler(async (req, res) => {
  const { keyword, category, location } = req.query;

  const query = {};

  if (keyword) {
    query.title = { $regex: keyword, $options: 'i' };
  }

  if (category) {
    query.category = category;
  }

  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  const results = await Property.find(query);
  res.status(200).json(new ApiResponse(200, results, 'Search results'));
});
