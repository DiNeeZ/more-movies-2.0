import axios from "axios";
import {
  MovieListResponseSchema,
  type MovieList,
} from "../models/movie-list-model";
import { GenreResponse } from "../models/genre-model";
import { TvListResponseSchema, type TvList } from "../models/tv-list-model";
import { TrailerResponse } from "../models/trailers-model";
import { genericizeMediaShape, renameSnakeKeysToCamel } from "../utils/helpers";
import {
  Person,
  PersonResponse,
  PersonResponseSchema,
} from "../models/person-model";
import {
  MovieDetailsSchema,
  TVDetailsSchema,
  type MovieDetails,
  type TVDetails,
} from "../models/details-model";

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

export const getMovie = async ({
  id,
  mediaType,
}: GenericRequestInfo): Promise<MovieDetails | TVDetails> => {
  const response = await MOVIE_API.get(
    `${mediaType}/${id}?api_key=${API_KEY}&language=en-US`
  );

  console.log(response);

  const responseToCamelCaseKeys = renameSnakeKeysToCamel(response.data);
  const transformedData = genericizeMediaShape(responseToCamelCaseKeys);
  const dataToParse = { mediaType, ...transformedData };

  if (mediaType === "tv") return TVDetailsSchema.parse(dataToParse);
  return MovieDetailsSchema.parse(dataToParse);
};

export const getTrendingMovies = async () => {
  const response = await MOVIE_API.get<MovieList>(
    `trending/movie/day?api_key=${API_KEY}`
  );

  const transformedResponse = response.data.results.map((result) => ({
    ...renameSnakeKeysToCamel(result),
  }));

  return MovieListResponseSchema.parse({
    ...response.data,
    results: transformedResponse,
  });
};

export const getTrendingTvs = async () => {
  const response = await MOVIE_API.get<TvList>(
    `trending/tv/day?api_key=${API_KEY}`
  );

  const transformedResponse = response.data.results.map((result) => {
    const responseToCamelCaseKeys = renameSnakeKeysToCamel(result);
    return {
      ...genericizeMediaShape(responseToCamelCaseKeys),
    };
  });

  return TvListResponseSchema.parse({
    ...response.data,
    results: transformedResponse,
  });
};

export const getUpcoming = async () => {
  const response = await MOVIE_API.get<MovieList>(
    `movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  );

  const transformedResponse = response.data.results.map((result) => ({
    ...renameSnakeKeysToCamel(result),
    mediaType: "movie",
  }));

  return MovieListResponseSchema.parse({
    ...response.data,
    results: transformedResponse,
  });
};

export const getTrailers = async ({ id, mediaType }: GenericRequestInfo) => {
  const response = await MOVIE_API.get<TrailerResponse>(
    `${mediaType}/${id}/videos?api_key=${API_KEY}`
  );

  const onlyTrailers = response.data.results.filter(
    (video) => video.type === "Trailer"
  );

  return onlyTrailers;
};

export const getPopularPersons = async () => {
  const response = await MOVIE_API.get<PersonResponse>(
    `person/popular?api_key=${API_KEY}&language=en-US`
  );

  const transformedResponse = response.data.results.map((result) =>
    renameSnakeKeysToCamel(result)
  );

  const generalizedResponse = transformedResponse.map((person: Person) => ({
    ...person,
    knownFor: person.knownFor.map((movie) => genericizeMediaShape(movie)),
  }));

  return PersonResponseSchema.parse({
    ...response.data,
    results: generalizedResponse,
  });
};
