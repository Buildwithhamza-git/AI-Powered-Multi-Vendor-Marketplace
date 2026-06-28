const { forgotPasswordService, resetPasswordService } = require("../services/passwordResetService")

const forgotPasswordController = async (req, res) => {
    try {
        const result = await forgotPasswordService(req.sanitizedBody);
        return res.status(200).json({
            success: true,
            message: "OTP sent to email",
            email: result.email,
        });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message, field: "email",   });
    }
};

const resetPasswordController = async (req, res) => {
    try {
        await resetPasswordService(req.sanitizedBody);
        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (err) {
        return res.status(400).json({ success: false, message: err.message });
    }
};

module.exports = { forgotPasswordController, resetPasswordController };