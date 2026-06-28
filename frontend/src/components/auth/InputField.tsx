import { useId, type InputHTMLAttributes, type Ref } from "react";


interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id">{
    label:string,
    error?: string,
    ref?: Ref<HTMLInputElement>;
}


export function InputField({label, error, ref, ...rest}:InputFieldProps){
    const id = useId()
    return(
        <div className="w-full">
        <label htmlFor="id" className="mb-1 block text-sm font-medium text-gray-700">
            {label}
        </label>
        <input  id={id} ref={ref} className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-indigo-500 ${error ? "border-red-400" : "border-gray-300" }`}{...rest}/>

        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    )
}