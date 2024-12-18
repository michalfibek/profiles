import { z } from "zod";
import { profileSchema } from "./profileSchema";

export const userSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  profile: profileSchema.optional(),
});

export const userRegistrationSchema = userSchema.omit({ id: true, profile: true });

export const userLoggedSchema = userSchema.omit({ id: true, password: true, profile: true });
