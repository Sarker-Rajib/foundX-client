import { z } from "zod";

export const registerValidationSchema = z.object({
  name: z.string().min(6, "At least 6 charecter"),
  email: z.string().trim().email(),
  mobileNumber: z.string(),
  password: z.string().trim().min(6, "At least 6 charecter"),
});
