import { z } from "zod";
import { profileSchema } from "./profileSchema";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).optional(),
  profile: profileSchema.optional(),
});

export const userLoggedSchema = userSchema.omit({ password: true, profile: true });
