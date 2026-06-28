import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "@/api/axiosInstance";

const OTP_LENGTH = 6;
const TIMER_SECONDS = 180;

export default function VerifyOtpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = (location.state as { email?: string })?.email;

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [secondsLeft, setSecondsLeft] = useState(TIMER_SECONDS);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  function handleDigitChange(index: number, value: string) {
    if (!/^[0-9]?$/.test(value)) return;

    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  async function handleVerify() {
    const Otp = digits.join("");

    if (Otp.length !== OTP_LENGTH) {
      setError("Enter all 6 digits.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
        console.log(email, Otp)
      const res = await api.post("/verify-otp", { email, Otp });
      console.log("Verify success:", res.data);
      navigate("/Login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Verification failed.");
      } else {
        setError("Unexpected error. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    setIsResending(true);
    setError("");

    try {
      await api.post("/resend-otp", { email });
      setDigits(Array(OTP_LENGTH).fill(""));
      setSecondsLeft(TIMER_SECONDS);
      inputsRef.current[0]?.focus();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "Could not resend OTP.");
      } else {
        setError("Unexpected error. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  }

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <p className="text-sm text-gray-600">
          No email found. Please{" "}
          <button onClick={() => navigate("/")} className="font-semibold text-indigo-600">
            sign up again
          </button>
          .
        </p>
      </div>
    );
  }

  const maskedEmail = email.replace(/^(.{2}).+(@.+)$/, "$1***$2");
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timerLabel = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Verify your email</h1>
        <p className="mb-6 text-sm text-gray-500">
          We sent a 6-digit code to <span className="font-medium">{maskedEmail}</span>
        </p>

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

        {error && <p className="mt-3 text-xs text-red-500">{error}</p>}

        <button
          type="button"
          onClick={handleVerify}
          disabled={isSubmitting}
          className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {isSubmitting ? "Verifying..." : "Verify"}
        </button>

        <div className="mt-5 text-sm text-gray-500">
          {secondsLeft > 0 ? (
            <p>Resend code in {timerLabel}</p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-indigo-600 disabled:opacity-60"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}