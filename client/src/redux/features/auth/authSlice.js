import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/fixed_axios';

const initialState = {
  user: null,
  token: null,
  isLoading: false,
  status: null,
};

export const registerUser = createAsyncThunk('auth/registerUser', async ({ username, password }) => {
  try {
    const { data } = await axios.post('/auth/register', { username, password });
    if (data.token) {
      window.localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
  try {
    const { data } = await axios.post('/auth/login', { username, password });
    if (data.token) {
      window.localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const getMe = createAsyncThunk('auth/getMe', async () => {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.status = null;
      window.localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message || 'Успішно';
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message || action.error?.message || 'Помилка реєстрації';
      })
      // login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message || 'Успішно';
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.error?.message || 'Помилка авторизації';
      })
      // get me
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
        state.status = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload?.message || 'Успішно';
        state.user = action.payload?.user || null;
        state.token = action.payload?.token || null;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.error?.message || 'Помилка авторизації';
      });
  },
});

export const { logout } = authSlice.actions;
export const checkIsAuth = (state) => Boolean(state.auth.token);

export default authSlice.reducer;
