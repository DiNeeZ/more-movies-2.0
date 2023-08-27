import { BASE_IMAGES } from "../api/tmdb";
import type { Genre } from "../models/genre-model";

export const extractGenres = (allGenres: Genre[], genreIds: number[]) =>
  allGenres.filter((genre) => genreIds?.includes(genre.id));

export const getImageUrl = (size: number | "original", imgPath: string) => {
  if (typeof size !== "number") {
    return `${BASE_IMAGES}${size}${imgPath}`;
  }

  return `${BASE_IMAGES}w${size}${imgPath}`;
};

export const getPosterPath = (path: string | undefined) => {
  if (!path) return undefined;

  return {
    preview: getImageUrl(92, path),
    image: getImageUrl(342, path),
  };
};

export const getBackdropPath = (
  path: string | undefined,
  original?: "original"
) => {
  if (!path) return undefined;

  return {
    preview: getImageUrl(300, path),
    image: getImageUrl(original ? "original" : 1280, path),
  };
};

export const getProfilePath = (path: string | undefined) => {
  if (!path) return undefined;

  return {
    preview: getImageUrl(45, path),
    image: getImageUrl(185, path),
  };
};

export const convertHexToRGBA = (hexCode: string, opacity = 1) => {
  let hex = hexCode.replace("#", "");

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};

export const shuffleArray = (array: Array<unknown>) => {
  return [...array].sort(() => 0.5 - Math.random());
};

export const snakeToCamel = (str: string) =>
  str.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

export const renameSnakeKeysToCamel = (obj: object) => {
  const entries = Object.keys(obj).map((key) => {
    const newKey = key.includes("_") ? snakeToCamel(key) : key;

    return { [newKey]: obj[key as keyof typeof obj] };
  });

  return Object.assign({}, ...entries);
};

export const genericizeMediaShape = (obj: object) => {
  const entries = Object.keys(obj).map((key) => {
    if (key === "name") {
      return { ["title"]: obj[key as keyof typeof obj] };
    }

    if (key === "firstAirDate") {
      return { ["releaseDate"]: obj[key as keyof typeof obj] };
    }

    return { [key]: obj[key as keyof typeof obj] };
  });

  return Object.assign({}, ...entries);
};
