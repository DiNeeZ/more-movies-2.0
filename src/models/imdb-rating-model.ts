import { z } from "zod";

export const IMDBRatingSchema = z
  .object({
    imdbID: z.string(),
    imdbRating: z.string(),
    imdbVotes: z.string(),
    metascore: z.string(),
  })
  .optional();

export const IMDBErrorSchema = z.object({
  Error: z.string(),
  Response: z.string(),
});

export type IMDBError = z.infer<typeof IMDBErrorSchema>;
export type IMDBRating = z.infer<typeof IMDBRatingSchema>;
