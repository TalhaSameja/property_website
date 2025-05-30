import cloudinary from './cloudinary.js';

const uploadImageToCloudinary = async (file, folder = 'user-profile') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: 'image',
    });
    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    throw new Error('Image upload failed: ' + error.message);
  }
};

export default uploadImageToCloudinary;
