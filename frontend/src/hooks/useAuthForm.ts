import { useState } from "react";
import { useForm } from "react-hook-form"
import  { zodResolver } from "@hookform/resolvers/zod";
import  { signupSchema} from "@/schemas/signupSchema";
import  type {  SignupInput, SignupOutput } from "@/schemas/signupSchema";
import type { AuthMode, AuthRole } from "@/types/auth.types";

export function  useAuthForm() {
    const [role, setrole] = useState<AuthRole>("buyer")
    const [mode, setMode] = useState<AuthMode>("signup")

    const signupForm = useForm<SignupInput, any, SignupOutput>({
            resolver: zodResolver(signupSchema),
            mode: "onBlur",
            defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            age: undefined,
            phone:'',
            role: "buyer",
            storename: "",
            password: "",
            confirmPassword: "",
        },
    })
    function changeRole(nextRole: AuthRole) {
        setrole(nextRole);
        signupForm.setValue("role", nextRole);
      }

return { role, changeRole, mode, setMode, signupForm}
}


