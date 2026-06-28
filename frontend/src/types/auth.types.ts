export type AuthRole = "buyer" | "seller"
export type AuthMode = "signup" | "login"

export interface BuyerSignupValues{
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    phone:string
    password: string;
    confirmpassword: string;
}


export interface SellerSignupValues extends BuyerSignupValues{
    storename: string;
}


export interface LoginValues{
    email: "string"
    password: "string"
}