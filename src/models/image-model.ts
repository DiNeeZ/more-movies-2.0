import { z } from "zod";

export const BaseImageSchema = z.object({
  aspectRatio: z.number(),
  filePath: z.string(),
  height: z.number(),
  width: z.number(),
  iso6391: z.union([z.string(), z.null()]),
});

export const ImagesSchema = z.object({
  backdrops: BaseImageSchema.array(),
  logos: BaseImageSchema.array(),
  posters: BaseImageSchema.array(),
});

export type BaseImage = z.infer<typeof BaseImageSchema>;
export type Images = z.infer<typeof ImagesSchema>;
