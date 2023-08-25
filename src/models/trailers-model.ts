import { z } from "zod";

export const TrailerSchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
  site: z.string(),
  size: z.number(),
  type: z.string(),
  official: z.boolean(),
  published_at: z.string(),
});

export const TrailerResponseSchema = z.object({
  id: z.number(),
  results: z.array(TrailerSchema),
});

export type Trailer = z.infer<typeof TrailerSchema>;
export type TrailerResponse = z.infer<typeof TrailerResponseSchema>;
