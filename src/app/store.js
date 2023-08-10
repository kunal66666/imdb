import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB";
import genreOrCategoryReducer  from "../features/currentGenreOrCategory";
import userReducer  from "../features/auth";

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer, 
 currentGenreOrCategory:genreOrCategoryReducer,         // Use 'tmdbApi.reducerPath' as the key
 user:userReducer,
},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
