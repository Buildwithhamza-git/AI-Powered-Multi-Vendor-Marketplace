const { createProductSchema, updateProductSchema } = require("../Validation/productValidation");

const validateCreateProduct = async (req, res, next) => {
    try {
        const result = await createProductSchema.safeParseAsync(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((v) => 
                ({ field: v.path[0], message: v.message }));

            return res.status(400).json({ success: false, message: "invalid inputs", error: errors });
        }
        req.sanitizedBody = result.data;
        return next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "internal server issue" });
    }
};

const validateUpdateProduct = async (req, res, next) => {
    try {
        const result = await updateProductSchema.safeParseAsync(req.body);
        if (!result.success) {
            const errors = result.error.issues.map((v) => 
                ({ field: v.path[0], message: v.message }));
            
            return res.status(400).json({ success: false, message: "invalid inputs", error: errors });
        }
        req.sanitizedBody = result.data;
        return next();
    } catch (err) {
        return res.status(500).json({ success: false, message: "internal server issue" });
    }
};

module.exports = { validateCreateProduct, validateUpdateProduct };