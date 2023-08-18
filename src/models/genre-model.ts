import { z } from "zod";

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const GenresResponseSchema = z.object({
  genres: z.array(GenreSchema),
});

export type Genre = z.infer<typeof GenreSchema>;
export type GenreResponse = z.infer<typeof GenresResponseSchema>;
