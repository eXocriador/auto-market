import {configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/auth/authSlice"
import postSlice from "./features/auth/post/fixed_postSlice"

export const store = configureStore({
  reducer: {
    post: postSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ⛔ дозволяє FormData
    }),
})
