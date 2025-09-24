import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/fixed_axios';

const initialState = {
  posts: [],
  popularPosts: [],
  user: null,
  page: 1,
  pages: 1,
  hasMore: true,
  loading: false,
  filterTimeout: null,
};

// Створення нового поста
export const createPost = createAsyncThunk(
  'post/createPost',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/posts', params);
      dispatch(getAllposts({ page: 1 })); // оновлення першої сторінки після створення
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

// Отримання всіх постів
export const getAllposts = createAsyncThunk(
  'post/getAllPosts',
  async ({ filters = {}, page = 1, limit = 9, append = false } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/posts', { params: { ...filters, page, limit } });
      return { ...data, page, append };
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Network error' });
    }
  }
);

// Видалення поста
export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    await axios.delete(`/posts/${id}`);
    return id;
  } catch (error) {
    throw error;
  }
});

// Отримання користувача
export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  try {
    const { data } = await axios.get(`/users/${userId}`);
    return data;
  } catch (error) {
    console.log('Error fetching user:', error.response?.data || error.message);
    return null;
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setFilterTimeout: (state, action) => {
      state.filterTimeout = action.payload;
    },
    clearPosts: (state) => {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // createPost
      .addCase(createPost.pending, (state) => { state.loading = true; })
      .addCase(createPost.fulfilled, (state) => { state.loading = false; })
      .addCase(createPost.rejected, (state) => { state.loading = false; })

      // getAllposts
      .addCase(getAllposts.pending, (state) => { state.loading = true; })
      .addCase(getAllposts.fulfilled, (state, action) => {
        state.loading = false;
        const { posts, popularPosts, pagination, page, append } = action.payload;

        if (append) {
          state.posts = [...state.posts, ...posts]; // інфініті-скрол
        } else {
          state.posts = posts; // кнопки сторінок — заміна
        }

        state.popularPosts = popularPosts || [];
        state.page = page;
        state.pages = pagination?.pages || 1;
        state.hasMore = pagination?.hasMore || false;
      })
      .addCase(getAllposts.rejected, (state) => { state.loading = false; })

      // removePost
      .addCase(removePost.pending, (state) => { state.loading = true; })
      .addCase(removePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(removePost.rejected, (state) => { state.loading = false; })

      // fetchUser
      .addCase(fetchUser.pending, (state) => { state.loading = true; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => { state.loading = false; });
  },
});

export const { setFilterTimeout, clearPosts } = postSlice.actions;
export default postSlice.reducer;
