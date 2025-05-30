import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  propertyType: {
    type: String,
    enum: ['house', 'apartment', 'flat', 'villa', 'other'],
    default: 'other',
  },

  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },

  images: [
    {
      type: String,
    },
  ],

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  status: {
    type: String,
    enum: ['active', 'pending', 'sold'],
    default: 'active',
  },
}, {
  timestamps: true,
});

export const Property = mongoose.model('Property', propertySchema);
