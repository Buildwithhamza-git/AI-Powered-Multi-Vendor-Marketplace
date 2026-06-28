const { z } = require("zod");

const createProductSchema = z.object({
    name: z.
    string({ required_error: "Product name is required" })
    .trim().min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),

    description: z
    .string({ required_error: "Description is required" })
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description too long"),

    price: z
    .coerce
    .number({ required_error: "Price is required" })
    .positive("Price must be greater than 0"),

    stock: z
    .coerce
    .number()
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative")
    .optional(),

    category: z
    .string()
    .trim()
    .optional(),
});

const updateProductSchema = createProductSchema.partial();

module.exports = { createProductSchema, updateProductSchema };