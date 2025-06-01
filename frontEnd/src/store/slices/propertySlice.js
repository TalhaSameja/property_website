import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base API URL
const API_URL = 'http://localhost:5000/api/properties';

// Get all properties
export const fetchProperties = createAsyncThunk('property/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get(API_URL);
    console.log(res)
    return res.data.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch properties');
  }
});

// Create a property
export const createProperty = createAsyncThunk('property/create', async (propertyData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const res = await axios.post(API_URL, propertyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create property');
  }
});

// Delete a property
export const deleteProperty = createAsyncThunk('property/delete', async (propertyId, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    await axios.delete(`${API_URL}/${propertyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return propertyId;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete property');
  }
});

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    properties: [],
    isLoading: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch properties
      .addCase(fetchProperties.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Create property
      .addCase(createProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties.push(action.payload);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })

      // Delete property
      .addCase(deleteProperty.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.properties = state.properties.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default propertySlice.reducer;
