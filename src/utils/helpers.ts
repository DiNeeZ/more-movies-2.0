import { BASE_IMAGES } from "../api/tmdb";
import type { Genre } from "../models/genre-model";

// Extract Genres
export const extractGenres = (allGenres: Genre[], genreIds: number[]) =>
  allGenres.filter((genre) => genreIds?.includes(genre.id));
// --------------------------------------------------------------------------------

// Get Image Url
export const getImageUrl = (size: number | "original", imgPath: string) => {
  if (typeof size !== "number") {
    return `${BASE_IMAGES}${size}${imgPath}`;
  }

  return `${BASE_IMAGES}w${size}${imgPath}`;
};
// --------------------------------------------------------------------------------

// Get Poster Path
export const getPosterPath = (path?: string, size?: "original" | "big") => {
  if (!path) return undefined;

  const imageSizes = {
    original: "original" as const,
    big: 780,
  };

  return {
    preview: getImageUrl(92, path),
    image: getImageUrl(size ? imageSizes[size] : 342, path),
  };
};
// --------------------------------------------------------------------------------

// Get Backdrop Path
export const getBackdropPath = (
  path?: string | null,
  size?: "original" | "mobile"
) => {
  if (!path) return undefined;

  const imageSizes = {
    original: "original" as const,
    mobile: 780,
  };

  return {
    preview: getImageUrl(300, path),
    image: getImageUrl(size ? imageSizes[size] : 1280, path),
  };
};
// --------------------------------------------------------------------------------

// Get Profile Path
export const getProfilePath = (path: string | null) => {
  if (!path) return undefined;

  return {
    preview: getImageUrl(45, path),
    image: getImageUrl(185, path),
  };
};
// --------------------------------------------------------------------------------

// Get Logo Image path
export const getLogoImagePath = (path: string | undefined) => {
  if (!path) return undefined;

  return getImageUrl(300, path);
};
// --------------------------------------------------------------------------------

// Convert Hex To RGBA
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
// --------------------------------------------------------------------------------

// Shuffle Array
export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  return [...array].sort(() => 0.5 - Math.random());
};
// --------------------------------------------------------------------------------

// Snake To Camel
export const snakeToCamel = (str: string) =>
  str.replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
// --------------------------------------------------------------------------------

// Slugify
export const slugify = (str: string) => {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
};
// --------------------------------------------------------------------------------

// Rename Snake Keys To Camel
export const renameSnakeKeysToCamel = (obj: object) => {
  const entries = Object.keys(obj).map((key) => {
    const newKey = key.includes("_")
      ? snakeToCamel(key)
      : key.charAt(0).toLowerCase() + key.slice(1);

    const value = obj[key as keyof typeof obj] as [];
    const isValueArray = Array.isArray(value) && !!value.length;
    const isArrayOfObjects =
      isValueArray && value.every((val) => typeof val === "object");

    if (isArrayOfObjects) {
      const camelcasedValue: typeof obj = (value as []).map((val) =>
        renameSnakeKeysToCamel(val)
      );

      return { [newKey]: camelcasedValue };
    }

    return { [newKey]: obj[key as keyof typeof obj] };
  });

  return Object.assign({}, ...entries);
};
// --------------------------------------------------------------------------------

// Genericize Media Shape
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
// --------------------------------------------------------------------------------

// Transform Date
export const transformDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
// --------------------------------------------------------------------------------
