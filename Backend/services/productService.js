const AppError = require("../utils/AppError");
const {
    createProduct,
    findProductBySeller,
    findProductById,
    updateProductByid,
    deleteProductById,
    findAllProducts,
} = require("../repositories/prooductRepository");

const createProductService = async (productData, sellerId) => {
    return await createProduct({ ...productData, sellerId });
};

const getSellerProductsService = async (sellerId) => {
    return await findProductBySeller(sellerId);
};

const getAllProductsService = async () => {
    return await findAllProducts();
};

const updateProductService = async (productId, updates, sellerId) => {
    const product = await findProductById(productId);

    if (!product) {
        throw new AppError("Product not found", null, 404);
    }

    if (product.sellerId.toString() !== sellerId.toString()) {
        throw new AppError("You do not have permission to edit this product", null, 403);
    }

    return await updateProductByid(productId, updates);
};

const deleteProductService = async (productId, sellerId) => {
    const product = await findProductById(productId);

    if (!product) {
        throw new AppError("Product not found", null, 404);
    }

    if (product.sellerId.toString() !== sellerId.toString()) {
        throw new AppError("You do not have permission to delete this product", null, 403);
    }

    return await deleteProductById(productId);
};

module.exports = {
    createProductService,
    getSellerProductsService,
    getAllProductsService,
    updateProductService,
    deleteProductService,
};