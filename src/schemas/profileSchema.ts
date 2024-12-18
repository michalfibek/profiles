// src/schemas/userSchema.ts
import { z } from "zod";

export const profileSchema = z.object({
  id: z.number().optional(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  birthDate: z.coerce.date().nullable().or(z.string().date().nullable()),
  photoUrl: z.string().url().nullable(),
  description: z.string().nullable(),
});

export const profileSchemaInput = profileSchema
  .extend({
    birthDate: z.string().date(),
  })
  .omit({ id: true });
