import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../../utils/fixed_axios';

const initialState = {
  user: null,
  posts: [],
  popularPosts: [],
  loading: false,
  filterTimeout: null, // Додаємо стан для ID таймера
};

// Створення нового поста
export const createPost = createAsyncThunk(
  'post/createPost',
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.post('/posts', params);

      dispatch(getAllposts()); // Оновлюємо список постів після створення

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Отримання всіх постів (з фільтрацією)
export const getAllposts = createAsyncThunk(
  'post/getAllPosts',
  async (filters = {}) => {
    try {
      const { data } = await axios.get('/posts', { params: filters });
      return data;
    } catch (error) {
      console.log('Error fetching posts:', error.response ? error.response.data : error.message);
      return { posts: [], popularPosts: [] }; // Повертаємо пусті масиви, щоб уникнути помилки
    }
  }
);

// Отримання даних користувача
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId) => {
    try {
      const { data } = await axios.get(`/users/${userId}`); // Запит до API для отримання даних користувача
      return data;
    } catch (error) {
      console.log('Error fetching user:', error.response ? error.response.data : error.message);
      return null;
    }
  }
);

// Видалення поста
export const removePost = createAsyncThunk('post/removePost', async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`);
    return data;
  } catch (error) {
    console.log('Error removing post:', error.response ? error.response.data : error.message);
    throw error; // Пробросити помилку
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setFilterTimeout: (state, action) => {
      state.filterTimeout = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Створення поста
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state) => {
        state.loading = false;
      })

      // Отримання всіх постів
      .addCase(getAllposts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllposts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload?.posts || [];
        state.popularPosts = action.payload?.popularPosts || [];
      })
      .addCase(getAllposts.rejected, (state) => {
        state.loading = false;
      })

      // Видалення поста
      .addCase(removePost.pending, (state) => {
        state.loading = true;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload.id);
      })
      .addCase(removePost.rejected, (state) => {
        state.loading = false;
      })

      // Завантаження даних користувача
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // Додаємо користувача в state
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setFilterTimeout } = postSlice.actions;
export default postSlice.reducer;
