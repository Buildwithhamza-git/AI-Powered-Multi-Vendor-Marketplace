import { z } from "zod";

export const signupSchema = z
  .object({
    firstname: z
      .string()
      .trim()
      .min(1, "First name is required")
      .min(3, "First name must be at least 3 characters")
      .max(15, "First name cannot exceed 15 characters"),

    lastname: z
      .string()
      .trim()
      .min(1, "Last name is required")
      .min(3, "Last name must be at least 3 characters")
      .max(15, "Last name cannot exceed 15 characters"),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Email is required")
      .email("Invalid email format"),

    age: z.coerce
      .number()
      .min(18, "Age must be at least 18")
      .max(60, "Age cannot be greater than 60"),

    role: z.enum(["buyer", "seller"], {
      message: "Please select Buyer or Seller",
    }),

    phone:z
    .string()
    .min(1, "Phone is required")
    .max(11, "The phone cannot be more then 11"),
    storename: z
      .string()
      .trim()
      .optional(),

    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password cannot exceed 20 characters")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
        "Password must contain at least one letter, one number, and one special character"
      ),

    confirmPassword: z
      .string()
      .trim()
      .min(1, "Confirm password is required"),
  })

  // Password Match Validation
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password must match password",
    path: ["confirmPassword"],
  })

  // Seller Store Validation
  .superRefine((data, ctx) => {
    if (data.role === "seller") {
      if (!data.storename || data.storename.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["storename"],
          message: "Store name is required for sellers",
        });
      } else if (data.storename.trim().length < 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["storename"],
          message: "Store name must be at least 3 characters",
        });
      } else if (data.storename.trim().length > 30) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["storename"],
          message: "Store name cannot exceed 30 characters",
        });
      }
    }
  });

export type SignupInput = z.input<typeof signupSchema>;

export type SignupOutput = z.output<typeof signupSchema>;