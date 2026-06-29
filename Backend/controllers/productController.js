const {
    createProductService,
    getSellerProductsService,
    getAllProductsService,
    updateProductService,
    deleteProductService,
} = require("../services/productService");

const createProductController = async (req, res) => {
    try {
        const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : null;

        const product = await createProductService(
            { ...req.sanitizedBody, imageUrl },
            req.user.userId
        );

        return res.status(201).json({ success: true, message: "Product created", data: product });
    } catch (err) {
        return res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
};

const getSellerProductsController = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 12 } = req.query;

        const { products, total } = await getSellerProductsService(req.user.userId, {
            search,
            page: Number(page),
            limit: Number(limit),
        });

        return res.status(200).json({
            success: true,
            count: products.length,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            data: products,
        });
    } catch (err) {
        return res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
};

const getAllProductsController = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 12 } = req.query;

        const { products, total } = await getAllProductsService({
            search,
            page: Number(page),
            limit: Number(limit),
        });

        return res.status(200).json({
            success: true,
            count: products.length,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            data: products,
        });
    } catch (err) {
        return res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
};

const updateProductController = async (req, res) => {
    try {
        const product = await updateProductService(req.params.id, req.sanitizedBody, req.user.userId);
        return res.status(200).json({ success: true, message: "Product updated", data: product });
    } catch (err) {
        return res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
};

const deleteProductController = async (req, res) => {
    try {
        await deleteProductService(req.params.id, req.user.userId);
        return res.status(200).json({ success: true, message: "Product deleted" });
    } catch (err) {
        return res.status(err.statusCode || 400).json({ success: false, message: err.message });
    }
};

module.exports = {
    createProductController,
    getSellerProductsController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
};