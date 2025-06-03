import { asyncHandler } from '../utils/asyncHandler.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../Utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import jwt from 'jsonwebtoken';
import uploadImageToCloudinary from '../utils/uploadImageToCloudinary.js';
import {sendEmail} from "../Utils/sendMail.js"
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};

// @desc Register user
export const registerUser = asyncHandler(async (req, res) => {
  console.log("i am in")
  const { name, email, password, phone, role } = req.body;


  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ApiError(400, 'Email already exists');

 

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role,
    otp,
    isVerified: false,
  });

const sent =   await sendEmail({to:email, subject:'Verify Your Email', html:`<h2>Hi ${name}</h2><p>Thank you for registering.</p> <p> here is your otp ${otp}</p>`});
if(!sent){
  throw new ApiError(400, "email not sent")
}
  res.status(201).json(new ApiResponse(201, { message: 'User registered. Please verify OTP sent to email.' }));
});

// @desc Verify OTP
export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  const verified = await user.matchOtp(otp);
  if (!user || !verified){
    await User.findByIdAndDelete(user.id)
     throw new ApiError(400, 'Invalid OTP');}

  user.isVerified = true;
  user.otp = "";
  await user.save();

  res.status(200).json(new ApiResponse(200, { message: 'Email verified successfully' }));
});

// @desc Login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, 'Invalid credentials');

  const isMatch = await user.matchPassword(password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');

  if (!user.isVerified) throw new ApiError(403, 'Please verify your email first');

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(200).json(
    new ApiResponse(200, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo: user.photo,
      },
      accessToken,
      refreshToken,
    })
  );
});

// @desc Forgot Password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, 'User not found');

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.otp = otp;
  await user.save();

  await sendEmail({to:email, subject:'Reset Your Password', html:`<h2>Hi</h2><p>Here is your password Reset OTP</p> <p> here is your otp ${otp}</p>`});
  res.status(200).json(new ApiResponse(200, { message: 'OTP sent to email' }));
});

// @desc Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { email, otp, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.otp !== otp) throw new ApiError(400, 'Invalid OTP');

  user.password = newPassword;
  user.otp = null;
  await user.save();

  res.status(200).json(new ApiResponse(200, { message: 'Password reset successfully' }));
});

// @desc Get current user
export const getCurrentUser = asyncHandler(async (req, res) => {
  console.log("i am in get current user ")
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json(new ApiResponse(200, user));
});

// @desc Refresh Access Token
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new ApiError(401, 'Refresh token is required');

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);
    const accessToken = generateAccessToken(user);

    res.status(200).json(new ApiResponse(200, { accessToken }));
  } catch (err) {
    throw new ApiError(401, 'Invalid refresh token');
  }
});

// @desc Logout user
export const logoutUser = asyncHandler(async (req, res) => {
  // If using cookies, clear it. If tokens are handled in frontend, do nothing here.
  res.status(200).json(new ApiResponse(200, { message: 'User logged out successfully' }));
});

// @desc Update Profile
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);

  const { name, phone } = req.body;
  if (req.file) {
    const imageData = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const uploaded = await uploadImageToCloudinary(imageData);
    user.photo = uploaded.url;
  }

  user.name = name || user.name;
  user.phone = phone || user.phone;

  await user.save();

  res.status(200).json(new ApiResponse(200, { message: 'Profile updated successfully' }));
});

