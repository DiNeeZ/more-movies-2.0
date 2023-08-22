import { z } from "zod";

export const TrandingMovieSchema = z
  .object({
    id: z.number(),
    title: z.string(),
    overview: z.string(),
    poster_path: z.string(),
    media_type: z.string(),
    genre_ids: z.number().array(),
    release_date: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
  })
  .transform(
    ({
      poster_path,
      media_type,
      genre_ids,
      release_date,
      vote_average,
      vote_count,
      ...rest
    }) => ({
      posterPath: poster_path,
      mediaType: media_type,
      genreIds: genre_ids,
      releaseDate: release_date,
      voteAverage: vote_average,
      voteCount: vote_count,
      ...rest,
    })
  );

export const TrandingMovieResponseSchema = z
  .object({
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
    results: z.array(TrandingMovieSchema),
  })
  .transform(({ total_pages, total_results, ...rest }) => ({
    totalPages: total_pages,
    totalResults: total_results,
    ...rest,
  }));

export type TrandingMovie = z.infer<typeof TrandingMovieSchema>;
export type TrandingMovies = z.infer<typeof TrandingMovieResponseSchema>;
