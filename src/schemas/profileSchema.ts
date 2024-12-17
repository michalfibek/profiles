// src/schemas/userSchema.ts
import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  birthDate: z.date().optional(),
  photoUrl: z.string().url().optional(),
  description: z.string().optional(),
});
