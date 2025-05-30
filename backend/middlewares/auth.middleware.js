import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ApiError } from '../Utils/ApiErrors.js';
import {asyncHandler} from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token is present in headers
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      const user = await User.findById(decoded._id).select('-password');

      if (!user) {
        throw new ApiError(401, 'User not found');
      }

      req.user = user; // Pass user to next middleware/route
      next();
    } catch (err) {
      throw new ApiError(401, 'Not authorized, token failed');
    }
  } else {
    throw new ApiError(401, 'No token, authorization denied');
  }
});
