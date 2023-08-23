import axios from "axios";
import {
  MovieListResponseSchema,
  type MovieList,
} from "../models/movie-list-model";
import { GenreResponse } from "../models/genre-model";
import { TvListResponseSchema, type TvList } from "../models/tv-list-model";

const BASE_URL = "https://api.themoviedb.org/3/";
export const BASE_IMAGES = "https://image.tmdb.org/t/p/";
const API_KEY = import.meta.env.VITE_TMDB_KEY;
const MOVIE_API = axios.create({
  baseURL: BASE_URL,
});

export const getGenres = async () => {
  const response = await MOVIE_API.get<GenreResponse>(
    `genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  return response.data.genres;
};

export const getTrendingMovies = async () => {
  const response = await MOVIE_API.get<MovieList>(
    `trending/movie/day?api_key=${API_KEY}`
  );

  return MovieListResponseSchema.parse(response.data);
};

export const getTrendingTvs = async () => {
  const response = await MOVIE_API.get<TvList>(
    `trending/tv/day?api_key=${API_KEY}`
  );

  return TvListResponseSchema.parse(response.data);
};

export const getUpcoming = async () => {
  const response = await MOVIE_API.get<MovieList>(
    `movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  );

  return MovieListResponseSchema.parse(response.data);
};
