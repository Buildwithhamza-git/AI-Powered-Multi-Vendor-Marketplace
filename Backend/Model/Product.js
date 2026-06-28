const mongoose = require("mongoose");
const { string } = require("zod");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        stock: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
        category: {
            type: String,
            trim: true,
            default: "Uncategorized",
        },
        sellerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        imageUrl:{
            type: String,
            default: null
        }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product };