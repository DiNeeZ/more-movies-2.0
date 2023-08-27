import { z } from "zod";
import { MediaSchema } from "./media-model";

export const TvListResponseSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(MediaSchema),
});

export type TvList = z.infer<typeof TvListResponseSchema>;
