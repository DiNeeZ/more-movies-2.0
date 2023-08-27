import { z } from "zod";

export const MediaSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  posterPath: z.string(),
  backdropPath: z.string(),
  mediaType: z.union([z.literal("movie"), z.literal("tv")]),
  genreIds: z.number().array(),
  releaseDate: z.string(),
  voteAverage: z.number(),
  voteCount: z.number(),
});

export type Media = z.infer<typeof MediaSchema>;
