import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .trim()
    .toLowerCase()
    .email("Invalid email format"),
});

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .trim()
      .toLowerCase()
      .email("Invalid email format"),

    otp: z
      .string()
      .min(1,"OTP is required")
      .trim()
      .length(6, "OTP must be exactly 6 digits")
      .regex(/^[0-9]+$/, "OTP must contain only digits"),

    newPassword: z
      .string()
      .min(1, "New password is required")
      .trim()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password cannot exceed 20 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "Password must contain at least one letter, one number, and one special character"
      ),

    confirmNewPassword: z
      .string()
      .min(1,  "Confirm password is required" )
      .trim(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;