import { z } from "zod";

export const TrandingTvSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string(),
  id: z.number(),
  name: z.string(),
  original_language: z.string(),
  original_name: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  media_type: z.string(),
  genre_ids: z.number().array(),
  popularity: z.number(),
  first_air_date: z.string(),
  vote_average: z.number(),
  vote_count: z.number(),
  origin_country: z.string().array(),
});

export const TrandingTvResponseSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(TrandingTvSchema),
});

export type TrandingTv = z.infer<typeof TrandingTvSchema>;
export type TrandingTvs = z.infer<typeof TrandingTvResponseSchema>;
