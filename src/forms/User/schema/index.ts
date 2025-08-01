import { z } from "zod";
import { PATTERNS } from "../constants";

const schema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  email: z
    .string()
    .min(1, "Email is required")
    .refine((email) => PATTERNS.email.test(email), {
      error: "Invalid email",
    }),
});

const defaultSchema: Schema = {
  name: "",
  email: "",
};

export type Schema = z.infer<typeof schema>;

export { schema, defaultSchema };
