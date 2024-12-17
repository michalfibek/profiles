import { z } from "zod";
import { profileSchema } from "./profileSchema";

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  profile: profileSchema.optional(),
});
