const {Product} = require ("../Model/Product")

const  createProduct = async(productData)=>{
    return await Product.create(productData)
}

const findProductBySeller = async(sellerId)=>{
    return await Product.find({sellerId}).sort({createdAt:-1})
}

const findProductById = async(id)=>{
    return await Product.findById(id);
}

const updateProductByid = async (id, updates)=>{
    return await Product.findOneAndUpdate({_id:id}, updates, {new:true})
}

const deleteProductById = async (id)=>{
    return await Product.findOneAndDelete({_id:id})
}

const findAllProducts = async()=>{
    return (await Product.find()).toSorted({createdAt: -1})
}

module.exports  = {createProduct, findProductBySeller, findProductById, updateProductByid, deleteProductById, findAllProducts}