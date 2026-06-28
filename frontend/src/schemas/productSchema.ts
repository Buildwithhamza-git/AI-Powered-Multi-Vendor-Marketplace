import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description too long"),

  price: z
    .string()
    .trim()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Price must be a number greater than 0",
    }),

  stock: z
    .string()
    .trim()
    .refine((val) => val === "" || (!isNaN(Number(val)) && Number(val) >= 0 && Number.isInteger(Number(val))), {
      message: "Stock must be a non-negative whole number",
    })
    .optional(),

  category: z.string().trim().optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;