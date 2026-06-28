const { findUserByEmail, findUserByPhone, createUser } = require("../repositories/userRepository")
const {generateToken} =require("../utils/jwtHelper")

const { createOtp } = require("../services/otpservice")
const { hashPassword , comparePassword} = require("../utils/passwordhelper")

const { sendEmail } = require("../services/emailService")


const signupservice = async (signupData) => {
    const {
        firstname,
        lastname,
        role,
        storename,
        email,
        password,
        age,
        phone
    } = signupData;

    const emailExist  = await findUserByEmail(email)
    if(emailExist){
        throw new Error(
            "Email Already Registered"
        )
    }

    const phoneExist = await findUserByPhone(phone)
    if(phoneExist){
        throw new Error("Phone Already registered")
    }

    const{otp, OtpExpiry} = createOtp()

    const hashedPassword = await hashPassword(password)

    const user = await createUser({
        firstname,
            lastname,
            role,
            storename: role === "seller" ? storename : undefined,
            email,
            password: hashedPassword,
            age,
            phone,
            Otp: otp,
            OtpExpire: OtpExpiry,
            isVerified: false,
    })

    const emailSend = await sendEmail(email, otp)
    if(!emailSend){
        throw new Error("Email Sending failed to ", email)
    } 
    return user
}


const loginservice = async (loginData)=>{
    const {email, password}= loginData

    const User = await findUserByEmail(email)
    if(!User){
        throw new Error ("The Email is not Registered")
    }

    const isMatched = await comparePassword(password ,User.password)
    if(!isMatched){
        throw new Error ("Invalid password or Email")
    }

    const token = await generateToken(User)
    
    return {
        User,token
    }


}

module.exports = {signupservice ,loginservice}