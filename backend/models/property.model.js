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
  bedrooms:{
    type: Number,
    default: 1
  },
  bathrooms:{
    type: Number,
    defalut: 1
  },
  sqft:{
    type: Number,
    default: 12
  },
  propertyType: {
    type: String,
   
  },

  location: {
    type:String, 
    default : ""
  },

  images: [
    String
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
