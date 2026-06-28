const {generateOtp, OtpExpiry} =require("../utils/Otphelper")

const createOtp = ()=>{
    return{
        otp: generateOtp(),
        OtpExpiry: OtpExpiry()
    }
}

module.exports ={createOtp}