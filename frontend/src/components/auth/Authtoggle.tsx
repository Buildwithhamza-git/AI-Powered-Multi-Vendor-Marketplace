import type { AuthRole } from "@/types/auth.types"

interface AuthToggleProp {
    role: AuthRole,
    onChange: (role:AuthRole)=> void
}

export function AuthToggle ({role, onChange}:AuthToggleProp){
    return(
        <div className="grid grid-cols-2 rounded-full bg-gray-100 p-1">
            <button
            type="button" 
            onClick={()=>onChange("buyer")}
            className={`rounded-full py-2 text-sm font-semibold transition ${
          role === "buyer" ? "bg-indigo-600 text-white" : "text-gray-500"
        }`}>
                Buyer
            </button>
            <button
        type="button"
        onClick={() => onChange("seller")}
        className={`rounded-full py-2 text-sm font-semibold transition ${
          role === "seller" ? "bg-orange-500 text-white" : "text-gray-500"
        }`}
      >
        Seller
      </button>
        </div>
    )
}