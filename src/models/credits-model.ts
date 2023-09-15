import { number, z } from "zod";
import { PersonSchema } from "./person-model";

export const CreditsPersonSchema = PersonSchema.extend({
  creditId: z.string(),
  castId: z.number().optional(),
  character: z.string().optional(),
});

export const CreditsSchema = z.object({
  id: number(),
  cast: CreditsPersonSchema.array(),
  crew: CreditsPersonSchema.array(),
});

export type CreditsPerson = z.infer<typeof CreditsPersonSchema>;
export type Credits = z.infer<typeof CreditsSchema>;
