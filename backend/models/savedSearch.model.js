import mongoose from 'mongoose';

const savedSearchSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  searchName: {
    type: String,
    required: true,
  },

  filters: {
    type: Object,
    required: true,
  },
}, {
  timestamps: true,
});

export const SavedSearch = mongoose.model('SavedSearch', savedSearchSchema);
