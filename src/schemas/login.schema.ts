import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(6, "At least 6 charecter"),
});
