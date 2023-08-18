import axios from "axios";
import { TrandingMovies } from "../models/movie-model";
import { GenreResponse } from "../models/genre-model";
import { TrandingTvs } from "../models/tv-model";

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
  const response = await MOVIE_API.get<TrandingMovies>(
    `trending/movie/day?api_key=${API_KEY}`
  );

  return {
    mediaType: "movie",
    ...response.data,
  };
};

export const getTrendingTvs = async () => {
  const response = await MOVIE_API.get<TrandingTvs>(
    `trending/tv/day?api_key=${API_KEY}`
  );

  return {
    mediaType: "tv",
    ...response.data,
  };
};
