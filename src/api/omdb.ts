import axios from "axios";
import { IMDBRatingSchema } from "../models/imdb-rating-model";
import { renameSnakeKeysToCamel } from "../utils/helpers";

const BASE_URL = "https://www.omdbapi.com";
const API_KEY = import.meta.env.VITE_OMDB_KEY;
const OMDB_API = axios.create({
  baseURL: BASE_URL,
});

export const getIMDBRating = async (
  imdbId: string | undefined,
  title: string
) => {
  if (imdbId) {
    const response = await OMDB_API.get(`?apikey=${API_KEY}&i=${imdbId}`);
    return IMDBRatingSchema.parse(renameSnakeKeysToCamel(response.data));
  } else {
    const response = await OMDB_API.get(`?apikey=${API_KEY}&t=${title}`);
    return IMDBRatingSchema.parse(renameSnakeKeysToCamel(response.data));
  }
};
