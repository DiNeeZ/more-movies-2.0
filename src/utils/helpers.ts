import { BASE_IMAGES } from "../api/tmdb";
import type { Genre } from "../models/genre-model";

export const extractGenres = (allGenres: Genre[], genreIds: number[]) =>
  allGenres.filter((genre) => genreIds?.includes(genre.id));

export const getImageUrl = (size: number, imgPath: string) => {
  return `${BASE_IMAGES}w${size}${imgPath}`;
};

export const getPosterPath = (path: string | undefined) => {
  if (!path) return undefined;

  return {
    preview: getImageUrl(92, path),
    image: getImageUrl(342, path),
  };
};

export const getBackdropPath = (path: string | undefined) => {
  if (!path) return undefined;

  return {
    preview: getImageUrl(300, path),
    image: getImageUrl(1280, path),
  };
};

export const getProfilePath = (path: string | undefined) => {
  if (!path) return undefined;

  return {
    preview: getImageUrl(45, path),
    image: getImageUrl(185, path),
  };
};
