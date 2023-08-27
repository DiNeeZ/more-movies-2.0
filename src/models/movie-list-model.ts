import { z } from "zod";
import { MediaSchema } from "./media-model";

export const MovieListResponseSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(MediaSchema),
});

export type MovieList = z.infer<typeof MovieListResponseSchema>;
