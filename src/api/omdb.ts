import axios from "axios";
import {
  IMDBError,
  IMDBRating,
  IMDBRatingSchema,
} from "../models/imdb-rating-model";
import { renameSnakeKeysToCamel } from "../utils/helpers";

const BASE_URL = "https://www.omdbapi.com";
const API_KEY = import.meta.env.VITE_OMDB_KEY;
const OMDB_API = axios.create({
  baseURL: BASE_URL,
});

export const getIMDBRating = async (imdbId: string | undefined) => {
  if (imdbId) {
    const response = await OMDB_API.get<IMDBRating | IMDBError>(
      `?apikey=${API_KEY}&i=${imdbId}`
    );

    if ((response.data as IMDBError).Error) return;

    return IMDBRatingSchema.parse(
      renameSnakeKeysToCamel((response.data as IMDBRating)!)
    );
  }
};
