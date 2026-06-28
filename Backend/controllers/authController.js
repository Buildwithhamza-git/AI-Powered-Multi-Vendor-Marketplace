const { signupservice, loginservice } = require("../services/authService")
const { verifyOtpService, resendOtpService } = require("../services/otpAuthService");
const { generateToken } = require("../utils/jwtHelper")
const SignupController = async (req, res) => {

    try {

        const user = await signupservice(req.sanitizedBody);

        return res.status(201).json({
            success: true,
            message: "Otp send Successfully",
            email: user.email,
            userId: user._id
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const loginController = async (req, res) => {
    try {
        const result = await loginservice(req.sanitizedBody)
        return res.status(200).json({
            success: true,
            message: "login successfully",
            token: result.token,
            user: {
                id: result.User._id,
                email: result.User.email,
                role: result.User.role
            }
        })
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message
        })
    }
}

const VerifyOtpController = async (req, res) => {
    try {

        const result = await verifyOtpService(req.sanitizedBody)
        const token = await generateToken(result)

        return res.status(200).json({
            success: true,
            message: "Account Verified Successfuly",
            token,
            user: {
                id: result._id,
                email: result.email,
                role: result.role
            }
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });


    }
}

const resendOtpController = async (req, res) => {
    try {
        const user = await resendOtpService(req.sanitizedBody);

        return res.status(200).json({
            success: true,
            message: "OTP resent successfully",
            email: user.email,
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }
};


module.exports = { SignupController, loginController, VerifyOtpController, resendOtpController }