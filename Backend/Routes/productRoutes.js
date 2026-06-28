const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/uploadMiddleware");

const { authMiddleware, requireRole } = require("../middleware/authmiddleware");
const { validateCreateProduct, validateUpdateProduct } = require("../middleware/validateProducts");
const {
    createProductController,
    getSellerProductsController,
    getAllProductsController,
    updateProductController,
    deleteProductController,
} = require("../controllers/productController");

router.post("/", authMiddleware, requireRole("seller"), validateCreateProduct, createProductController);
router.get("/seller", authMiddleware, requireRole("seller"), getSellerProductsController);
router.get("/", getAllProductsController);
router.put("/:id", authMiddleware, requireRole("seller"), validateUpdateProduct, updateProductController);
router.delete("/:id", authMiddleware, requireRole("seller"), deleteProductController);
router.post("/",authMiddleware,requireRole("seller"),upload.single("image"),validateCreateProduct,createProductController
);
module.exports = router;