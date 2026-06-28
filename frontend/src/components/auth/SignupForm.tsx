import { InputField } from "@/components/auth/InputField";
import type { UseFormReturn } from "react-hook-form";
import type { SignupInput } from "@/schemas/signupSchema";
import type { AuthRole } from "@/types/auth.types";

interface SignupFormProps {
  role: AuthRole;
  form: UseFormReturn<SignupInput>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading:boolean;
  onLogin: ()=> void
}

export function SignupForm({ role, form, onSubmit , isLoading, onLogin}: SignupFormProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <InputField label="First Name" error={errors.firstname?.message} {...register("firstname")} />
      <InputField label="Last Name" error={errors.lastname?.message} {...register("lastname")} />
      <InputField label="Email Address" type="email" error={errors.email?.message} {...register("email")} />
      <InputField label="Age" type="number" error={errors.age?.message} {...register("age")} />
      <InputField label="Phone" type="number" error={errors.phone?.message} {...register("phone")} />

      {role === "seller" && (
        <InputField label="Store Name" error={errors.storename?.message} {...register("storename")} />
      )}

      <InputField
        label="Password"
        type="password"
        error={errors.password?.message}
        {...register("password")}
      />
      <InputField
        label="Confirm Password"
        type="password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <button
  type="submit"
  disabled={isLoading}
  className="mt-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
>
  {isLoading ? "Signing up..." : "Create Account"}
</button>
<div className="mt-6 text-center text-sm text-gray-600">
  Already have an account?{" "}
  <button
    type="button"
    onClick={onLogin}
    className="font-semibold text-indigo-600 hover:underline"
  >
    Login
  </button>
</div>
    </form>
  );
}