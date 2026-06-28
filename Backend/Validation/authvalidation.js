const { z, email } = require("zod");

const SignupSchema = z.object({
    firstname: z
        .string({ required_error: "First Name is required" })
        .trim()
        .min(3, "First name must be at least 3 characters")
        .max(15, "First name cannot exceed 15 characters"),

    lastname: z
        .string({ required_error: "Last Name is required" })
        .trim()
        .min(3, "Last name must be at least 3 characters")
        .max(15, "Last name cannot exceed 15 characters"),

    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .toLowerCase()
        .email("Invalid Email format"),

    phone: z
        .string({ required_error: "Phone no is required" })
        .trim()
        .length(11, "Phone no must be exactly 11 digits")
        .regex(/^[0-9]+$/, "Phone must contain only digits"),

    age: z
        .number({ required_error: "Age is required", invalid_type_error: "Age must be a number" })
        .min(18, "Age Must be at least 18")
        .max(60, "Age cannot be greater than 60"),

    role: z.enum(["buyer", "seller"], { required_error: "Role must be either buyer or seller" }),

    storename: z.string().trim().optional(),

    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password cannot exceed 20 characters" })
        .regex(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
            {
                message: "Password must contain at least one letter, one number, and one special character",
            }
        ),

    confirmPassword: z
        .string({ required_error: "Confirm Password is required" })
        .trim(),
})

    .refine((data) => data.password === data.confirmPassword, {
        message: "Confirm Password must match Password",
        path: ["confirmPassword"],
    })


    .superRefine((data, ctx) => {
        if (data.role === "seller" && (!data.storename || data.storename.trim() === "")) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Store name is required for sellers",
                path: ["storename"],
            });
        }
    });


const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Invalid Email"),

    password: z
        .string()
        .min(8, "Password is required")
})


const verifyOtpSchema = z.object({
    email: z
        .string({ required_error: "email is required" })
        .trim()
        .toLowerCase()
        .email("Invalid Email Format"),
    Otp: z
        .string({ required_error: "Otp is Required" })
        .trim()
        .length(6, "Otp must be Exactly 6 digits")
        .regex(/^[0-9]+$/, "OTP must contain only digits")
})


const resendOtpSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .toLowerCase()
        .email("Invalid Email Format")
})


const forgotPasswordSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .toLowerCase()
        .email("Invalid email format"),
});

const resetPasswordSchema = z
    .object({
        email: z
            .string({ required_error: "Email is required" })
            .trim()
            .toLowerCase()
            .email("Invalid email format"),

        otp: z
            .string({ required_error: "OTP is required" })
            .trim()
            .length(6, "OTP must be exactly 6 digits")
            .regex(/^[0-9]+$/, "OTP must contain only digits"),

        newPassword: z
            .string({ required_error: "New password is required" })
            .trim()
            .min(8, "Password must be at least 8 characters long")
            .max(20, "Password cannot exceed 20 characters")
            .regex(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                "Password must contain at least one letter, one number, and one special character"
            ),

        confirmNewPassword: z
            .string({ required_error: "Confirm password is required" })
            .trim(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
    });



module.exports = { SignupSchema, loginSchema, verifyOtpSchema, resendOtpSchema, resetPasswordSchema, forgotPasswordSchema };