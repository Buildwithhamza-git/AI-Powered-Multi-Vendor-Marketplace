import { useAuthForm } from "@/hooks/useAuthForm";
import { AuthToggle } from "@/components/auth/Authtoggle";
import { SignupForm } from "@/components/auth/SignupForm";
import { useNavigate } from "react-router-dom";
import type { SignupInput, signupSchema } from "@/schemas/signupSchema";
import { useState } from "react";
import { api } from "@/api/axiosInstance";
import axios from "axios";

export default function AuthPage() {
    const navigate = useNavigate()
  const { role, changeRole, signupForm } = useAuthForm();
const [isSigningUp, setIsSigningUp] = useState(false);

async function handleSignup(values: SignupInput) {
  setIsSigningUp(true);
  try {
    const res = await api.post("/signup", values);

    console.log("Signup Success:", res.data);

    navigate("/verify-otp", {
      state: {
        email: values.email,
      },
    });
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const message =
        err.response?.data?.message || "Signup failed. Please try again.";

      // Email already exists
      if (message.toLowerCase().includes("email")) {
        signupForm.setError("email", {
          type: "server",
          message,
        });
      }

      // Phone already exists
      else if (message.toLowerCase().includes("phone")) {
        signupForm.setError("phone", {
          type: "server",
          message,
        });
      }

      // Store name already exists
      else if (message.toLowerCase().includes("store")) {
        signupForm.setError("storename", {
          type: "server",
          message,
        });
      }

      // Any other backend error
      else {
        console.error(message);
      }
      
    } else {
      console.error("Unexpected Error:", err);
    } 
  }finally{
      setIsSigningUp(false)
    }
}

  return (
    <div className="flex min-h-screen pt-7 pb-7 items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">ShopHub</h1>
        <p className="mb-6 text-sm text-gray-500">Buy. Sell. Grow.</p>

        <div className="mb-6">
          <AuthToggle role={role} onChange={changeRole} />
        </div>

        <SignupForm  role={role} form={signupForm} isLoading={isSigningUp} onLogin={()=>navigate("/login")} onSubmit={signupForm.handleSubmit(handleSignup)} />
      </div>
    </div>
  );
}