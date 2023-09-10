import { z } from "zod";
import { GenreSchema } from "./genre-model";

const BaseDetailsSchema = z.object({
  id: z.number(),
  homepage: z.string(),
  tagline: z.string(),
  imdbId: z.string().optional(),
  title: z.string(),
  overview: z.string(),
  posterPath: z.string(),
  backdropPath: z.string().optional(),
  mediaType: z.union([z.literal("movie"), z.literal("tv")]),
  genres: GenreSchema.array(),
  releaseDate: z.string(),
  voteAverage: z.number(),
  voteCount: z.number(),
});

export const MovieDetailsSchema = BaseDetailsSchema.extend({
  budget: z.number(),
  revenue: z.number(),
  runtime: z.number(),
});

export const TVDetailsSchema = BaseDetailsSchema.extend({
  lastAirDate: z.union([z.string(), z.null()]),
  episodeRunTime: z.number().array(),
  status: z.string(),
  numberOfEpisodes: z.number(),
  numberOfSeasons: z.number(),
});

export type MovieDetails = z.infer<typeof MovieDetailsSchema>;
export type TVDetails = z.infer<typeof TVDetailsSchema>;
