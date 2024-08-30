import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(4, {
      message: "Password must be at least 4 characters",
    }),
  status: z.string({
    required_error: "Status is required",
  }),
});

export const loginSchema = z.object({
  username: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(4, {
      message: "Password must be at least 4 characters",
    }),
});
