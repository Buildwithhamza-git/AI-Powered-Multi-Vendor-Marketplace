const express = require('express');
const routes  = express.Router();
const {validateSignup, validatelogin,validateVerifyOtp, validateResendOtp,validateForgotPassword, validateResetPassword} = require('../Middleware/authmiddleware')
const { SignupController ,loginController, VerifyOtpController, resendOtpController} = require('../controllers/authController')
const {forgotPasswordController, resetPasswordController}=require("../controllers/passwordResetController")

routes.post("/signup", validateSignup, SignupController);

routes.post("/login", validatelogin, loginController)

routes.post("/verify-otp", validateVerifyOtp, VerifyOtpController)

routes.post("/resend-otp", validateResendOtp, resendOtpController)

routes.post("/forgot-password", validateForgotPassword, forgotPasswordController);

routes.post("/reset-password", validateResetPassword, resetPasswordController);

module.exports  = {routes}