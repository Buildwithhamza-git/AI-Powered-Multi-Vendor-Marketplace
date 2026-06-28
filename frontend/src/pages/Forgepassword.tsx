import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { api } from "@/api/axiosInstance";
import { InputField } from "@/components/auth/InputField";
import {type ForgotPasswordSchema, forgotPasswordSchema } from "@/schemas/passwrodResetSchema";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onBlur",
    defaultValues: { email: "" },
  });

  async function handleForgotPassword(values: ForgotPasswordSchema) {
    try {
      const res = await api.post("/forgot-password", values);
      console.log("OTP sent:", res.data);
      navigate("/reset-password", { state: { email: values.email } });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err.response?.data)
        const data = err.response?.data as { message?: string; field?: keyof ForgotPasswordSchema };
        if (data?.field) {
          setError(data.field, { type: "server", message: data.message });
        } else {
          console.error("Request failed:", data?.message ?? err.message);
        }
      } else {
        console.error("Unexpected error:", err);
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Forgot your password?</h1>
        <p className="mb-6 text-sm text-gray-500">
          Enter your email and we'll send you a code to reset it.
        </p>

        <form onSubmit={handleSubmit(handleForgotPassword)} noValidate className="flex flex-col gap-4">
          <InputField label="Email" type="email" error={errors.email?.message} {...register("email")} />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Reset Code"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Remembered your password?{" "}
          <Link to="/login" className="font-semibold text-indigo-600">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}