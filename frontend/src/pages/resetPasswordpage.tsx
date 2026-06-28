import { useRef, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { api } from "@/api/axiosInstance";
import { InputField } from "@/components/auth/InputField";
import {type  ResetPasswordSchema, resetPasswordSchema } from "@/schemas/passwrodResetSchema";

const OTP_LENGTH = 6;

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string })?.email;

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: { email: email ?? "", otp: "", newPassword: "", confirmNewPassword: "" },
  });

  function handleDigitChange(index: number, value: string) {
    if (!/^[0-9]?$/.test(value)) return;

    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setValue("otp", next.join(""), { shouldValidate: true });

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  async function handleResetPassword(values: ResetPasswordSchema) {
    try {
      await api.post("/reset-password", values);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data as { message?: string; field?: keyof ResetPasswordSchema };
        if (data?.field) {
          setError(data.field, { type: "server", message: data.message });
        } else {
          console.error("Reset failed:", data?.message ?? err.message);
        }
      } else {
        console.error("Unexpected error:", err);
      }
    }
  }

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <p className="text-sm text-gray-600">
          No email found. Please{" "}
          <Link to="/forgot-password" className="font-semibold text-indigo-600">
            request a reset code
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Reset your password</h1>
        <p className="mb-6 text-sm text-gray-500">
          Enter the code sent to <span className="font-medium">{email}</span> and choose a new password.
        </p>

        <form onSubmit={handleSubmit(handleResetPassword)} noValidate className="flex flex-col gap-4">
          <div className="flex justify-center gap-2">
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-12 w-12 rounded-xl border border-gray-300 text-center text-lg font-semibold outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>
          {errors.otp && <p className="text-center text-xs text-red-500">{errors.otp.message}</p>}

          <InputField
            label="New Password"
            type="password"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <InputField
            label="Confirm New Password"
            type="password"
            error={errors.confirmNewPassword?.message}
            {...register("confirmNewPassword")}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}