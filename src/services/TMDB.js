import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;


// console.log(tmdbApiKey)
export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({
        // Get Movies by Type

        getGenres: builder.query({
            query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
          }),
          
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                // console.log(genreIdOrCategoryName);

                // Get Movies by Search
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }

                //Get Movies by Category - popular. top_rated, upcoming
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }

                //  Get Movies by Genre - popular. top_rated, upcoming
                
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }

                //Get Popular Movies
          return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),


        //get movie
        getMovie:builder.query({
            query:(id)=>`/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
        }),

        //get user sepecfic 
        getRecommendations: builder.query({
            query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
          }),
      
           // Get Actor
    getActor: builder.query({
        query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
      }),
  
      // Get Movies by Actor
      getMoviesByActorId: builder.query({
        query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
      }),
  
      // Get User Specific Lists
      getList: builder.query({
        query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
      }),

  }),
});

export const 
{ useGetGenresQuery ,
     useGetMoviesQuery, useGetMovieQuery,
     useGetRecommendationsQuery,
    useGetActorQuery,useGetListQuery,useGetMoviesByActorIdQuery} = tmdbApi;
