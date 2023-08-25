import { z } from "zod";

import { Trailer } from "./trailers-model";
import { renameSnakeKeysToCamel } from "../utils/helpers";

const BaseMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  backdrop_path: z.string(),
  media_type: z.string().optional(),
  genre_ids: z.number().array(),
  release_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const MovieSchema = BaseMovieSchema.transform((schemaKeys) =>
  renameSnakeKeysToCamel(schemaKeys)
);

const BaseMovieListResponseSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(MovieSchema),
});

export const MovieListResponseSchema = BaseMovieListResponseSchema.transform(
  (schemaKeys) => renameSnakeKeysToCamel(schemaKeys)
);

export type Movie = z.infer<typeof MovieSchema>;
export type MovieList = z.infer<typeof MovieListResponseSchema>;
