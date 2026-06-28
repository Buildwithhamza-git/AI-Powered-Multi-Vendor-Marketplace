import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { api } from "@/api/axiosInstance";
import { InputField } from "@/components/auth/InputField";
import { loginSchema, type LoginSchema } from "@/schemas/loginSchema";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: { email: "", password: "" },
  });

  async function handleLogin(values: LoginSchema) {
  try {
    const res = await api.post("/login", values);
    const { token, user } = res.data;

    login(user, token);

    if (user.role === "seller") {
      navigate("/seller/dashboard");
    } else {
      navigate("/buyer/home");
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const data = err.response?.data as { message?: string; field?: keyof LoginSchema };
      if (data?.field) {
        setError(data.field, { type: "server", message: data.message });
      } else {
        console.error("Login failed:", data?.message ?? err.message);
      }
    } else {
      console.error("Unexpected error:", err);
    }
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="mb-6 text-sm text-gray-500">Login to continue to your ShopHub account.</p>

        <form onSubmit={handleSubmit(handleLogin)} noValidate className="flex flex-col gap-4">
          <InputField label="Email" type="email" error={errors.email?.message} {...register("email")} />
          <InputField
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="text-right">
            <Link to="/forgot-password" className="text-xs font-semibold text-gray-500 hover:text-gray-700">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="mt-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/" className="font-semibold text-indigo-600">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}