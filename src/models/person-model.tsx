import { z } from "zod";
import { MediaSchema } from "./media-model";

export const PersonSchema = z.object({
  id: z.number(),
  gender: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3)]),
  // knownFor: z.array(MediaSchema),
  // knownForDepartment: z.string(),
  name: z.string(),
  profilePath: z.string(),
});

export const PersonResponseSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(PersonSchema),
});

export type Person = z.infer<typeof PersonSchema>;
export type PersonResponse = z.infer<typeof PersonResponseSchema>;
