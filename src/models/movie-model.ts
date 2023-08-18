import { z } from "zod";

export const TrandingMovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  id: z.number(),
  title: z.string(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  media_type: z.string(),
  genre_ids: z.number().array(),
  popularity: z.number(),
  release_date: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const TrandingMovieResponseSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(TrandingMovieSchema),
});

export type TrandingMovie = z.infer<typeof TrandingMovieSchema>;
export type TrandingMovies = z.infer<typeof TrandingMovieResponseSchema>;
