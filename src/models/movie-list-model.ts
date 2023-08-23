import { z } from "zod";

export const MovieSchema = z
  .object({
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
  })
  .transform(
    ({
      poster_path,
      backdrop_path,
      media_type,
      genre_ids,
      release_date,
      vote_average,
      vote_count,
      ...rest
    }) => ({
      posterPath: poster_path,
      backdropPath: backdrop_path,
      mediaType: media_type,
      genreIds: genre_ids,
      releaseDate: release_date,
      voteAverage: vote_average,
      voteCount: vote_count,
      ...rest,
    })
  );

export const MovieListResponseSchema = z
  .object({
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
    results: z.array(MovieSchema),
  })
  .transform(({ total_pages, total_results, ...rest }) => ({
    totalPages: total_pages,
    totalResults: total_results,
    ...rest,
  }));

export type Movie = z.infer<typeof MovieSchema>;
export type MovieList = z.infer<typeof MovieListResponseSchema>;
