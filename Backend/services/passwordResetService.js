const { findUserByEmail, updateUserByEmail } = require("../repositories/userRepository")
const {createOtp}  = require("../services/otpservice")
const { sendEmail } = require("../services/emailService")
const { hashPassword } = require("../utils/passwordhelper")

const forgotPasswordService = async (forgotData) => {
    const { email } = forgotData;

    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Email is not registered");
    }
    const otpcombine = createOtp()
    const {otp, OtpExpiry}= otpcombine  
    await updateUserByEmail(email, {
        Otp: otp,
        OtpExpire: OtpExpiry,
    });

    const emailSend = await sendEmail(email, otp);
    if (!emailSend) {
        throw new Error("Email sending failed to " + email);
    }

    return { email };
};

const resetPasswordService = async (resetData) => {
    const { email, otp, newPassword } = resetData;

    const user = await findUserByEmail(email);
    if (!user) {
        throw new Error("Email is not registered");
    }

    if (user.Otp !== otp) {
        throw new Error("Invalid OTP");
    }

    if (new Date() > user.OtpExpire) {
        throw new Error("OTP has expired");
    }

    const hashedPassword = await hashPassword(newPassword);

    const updatedUser = await updateUserByEmail(email, {
        password: hashedPassword,
        Otp: null,
        OtpExpire: null,
    });

    return updatedUser;
};

module.exports = { forgotPasswordService, resetPasswordService };