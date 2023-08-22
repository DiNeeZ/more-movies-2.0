import { z } from "zod";

export const TrandingTvSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    overview: z.string(),
    poster_path: z.string(),
    media_type: z.string(),
    genre_ids: z.number().array(),
    first_air_date: z.string(),
    vote_average: z.number(),
    vote_count: z.number(),
  })
  .transform(
    ({
      name,
      poster_path,
      media_type,
      genre_ids,
      first_air_date,
      vote_average,
      vote_count,
      ...rest
    }) => ({
      title: name,
      posterPath: poster_path,
      mediaType: media_type,
      genreIds: genre_ids,
      releaseDate: first_air_date,
      voteAverage: vote_average,
      voteCount: vote_count,
      ...rest,
    })
  );

export const TrandingTvResponseSchema = z
  .object({
    page: z.number(),
    total_pages: z.number(),
    total_results: z.number(),
    results: z.array(TrandingTvSchema),
  })
  .transform(({ total_pages, total_results, ...rest }) => ({
    totalPages: total_pages,
    totalResults: total_results,
    ...rest,
  }));

export type TrandingTv = z.infer<typeof TrandingTvSchema>;
export type TrandingTvs = z.infer<typeof TrandingTvResponseSchema>;
