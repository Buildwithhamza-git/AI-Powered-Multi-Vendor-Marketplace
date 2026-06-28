const { success, flattenError } = require("zod");
const { SignupSchema , loginSchema, verifyOtpSchema, resendOtpSchema, forgotPasswordSchema, resetPasswordSchema} = require("../Validation/authvalidation");


const validateSignup = async (req, res, next) => {
    try {
        
        const validateData = await SignupSchema.safeParseAsync(req.body);

        if (!validateData.success) {
            console.log(validateData.error.issues)
            const collectErrors = validateData.error.issues.map((v) => {
               return { field: v.path[0] || "global", message: v.message };
            });

            return res.status(400).json({
                success: false,
                message: "Invalid input",
                payload: null,
                errors: collectErrors
            });
        }

        req.sanitizedBody = validateData.data;
        
        next();
        
    } catch (error) {
        console.error("Internal Middleware Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



const validatelogin = async (req,res,next)=>{
    try{
        const validateData = await loginSchema.safeParseAsync(req.body)

        if(!validateData.success){
            const errors = validateData.error.issues.map(v=>{
                return {field: v.path[0], message: v.message}
            })
            return res.status(400).json({
                success: false,
                message: "invalid inputs",
                error:errors
            })
        }

        req.sanitizedBody = validateData.data
        return next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "internal server issue"
        })
    }
}


const validateVerifyOtp  = async (req,res,next)=>{
    try{
        const validateData = await verifyOtpSchema.safeParseAsync(req.body)
        if(!validateData.success){
            const erros = validateData.error.issues.map((v)=>{
                return {field: v.path[0], message: v.message}
            })
            console.log(erros);

            return res.status(400).json({
                success: false,
                message: "Invalid Inputs",
                error: erros
            })
        }
        req.sanitizedBody = validateData.data
        return next()
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "internal Server issue"
    })

    }
}

const validateResendOtp = async (req, res, next) => {
    try {
        const validateData = await resendOtpSchema.safeParseAsync(req.body);

        if (!validateData.success) {
            const errors = validateData.error.issues.map((v) => {
                return { field: v.path[0], message: v.message };
            });
            return res.status(400).json({
                success: false,
                message: "invalid inputs",
                error: errors,
            });
        }

        req.sanitizedBody = validateData.data;
        return next();
    } catch (err) {

        console.log(err)
        return res.status(500).json({
            success: false,
            message: "internal server issue",
            error: err.message
        });
    }
};

const validateForgotPassword = async (req, res, next) => {
    try {
        const validateData = await forgotPasswordSchema.safeParseAsync(req.body);
        if (!validateData.success) {
            const errors = validateData.error.issues.map((v) => ({ field: v.path[0], message: v.message }));
            return res.status(400).json({ success: false, message: "invalid inputs", error: errors });
        }
        req.sanitizedBody = validateData.data;
        return next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "internal server issue" });
    }
};

const validateResetPassword = async (req, res, next) => {
    try {
        const validateData = await resetPasswordSchema.safeParseAsync(req.body);
        if (!validateData.success) {
            const errors = validateData.error.issues.map((v) => ({ field: v.path[0], message: v.message }));
            return res.status(400).json({ success: false, message: "invalid inputs", error: errors });
        }
        req.sanitizedBody = validateData.data;
        return next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "internal server issue" });
    }
};
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            userId: decoded.userId,
            role: decoded.role,
            email: decoded.email,
        };

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

const requireRole = (role) => {
    return (req, res, next) => {
        if (req.user?.role !== role) {
            return res.status(403).json({
                success: false,
                message: `Access denied. ${role} role required.`,
            });
        }
        next();
    };
};


module.exports = {authMiddleware, requireRole , validateSignup , validatelogin, validateVerifyOtp, validateResendOtp, validateForgotPassword, validateResetPassword};