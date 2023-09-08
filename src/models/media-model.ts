import { z } from "zod";

export const MediaSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  posterPath: z.string().optional(),
  backdropPath: z.string().optional(),
  mediaType: z.union([z.literal("movie"), z.literal("tv")]),
  genreIds: z.number().array().optional(),
  releaseDate: z.string(),
  voteAverage: z.number(),
  voteCount: z.number(),
  homepage: z.string().url().optional(),
});

export type Media = z.infer<typeof MediaSchema>;
