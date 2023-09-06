import { z } from "zod";

export const IMDBRatingSchema = z.object({
  imdbID: z.string(),
  imdbRating: z.string(),
  imdbVotes: z.string(),
  metascore: z.string(),
});

export type IMDBRating = z.infer<typeof IMDBRatingSchema>;
