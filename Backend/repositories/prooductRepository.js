const {Product} = require ("../Model/Product")

const  createProduct = async(productData)=>{
    return await Product.create(productData)
}

const findProductBySeller = async (sellerId, { search = "", page = 1, limit = 12 } = {}) => {
    const filter = { sellerId };

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Product.countDocuments(filter),
    ]);

    return { products, total };
};

const findAllProducts = async ({ search = "", page = 1, limit = 12 } = {}) => {
    const filter = {};

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
        Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Product.countDocuments(filter),
    ]);

    return { products, total };
};

const findProductById = async(id)=>{
    return await Product.findById(id);
}

const updateProductByid = async (id, updates)=>{
    return await Product.findOneAndUpdate({_id:id}, updates, {new:true})
}

const deleteProductById = async (id)=>{
    return await Product.findOneAndDelete({_id:id})
}


module.exports  = {createProduct, findProductBySeller, findProductById, updateProductByid, deleteProductById, findAllProducts}