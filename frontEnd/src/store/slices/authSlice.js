// store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1) LOGIN
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
      const { accessToken, user } = res.data.data;

      // ✔️ Stringify the user!
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      return { user };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Login failed');
    }
  }
);

// 2) CHECK AUTH STATUS on App load
export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) return rejectWithValue('No token found');

    try {
      const res = await axios.get('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✔️ Return the actual user object
      return { user: res.data.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Auth check failed');
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (b) => {
    b
      // LOGIN
      .addCase(loginUser.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.isAuthenticated = true;
        s.user = a.payload.user;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload?.message || 'Login failed';
      })
      // CHECK STATUS
      .addCase(checkAuthStatus.pending, (s) => { s.loading = true; })
      .addCase(checkAuthStatus.fulfilled, (s, a) => {
        s.loading = false;
        s.isAuthenticated = true;
        s.user = a.payload.user;
      })
      .addCase(checkAuthStatus.rejected, (s) => {
        s.loading = false;
        s.isAuthenticated = false;
        s.user = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
