const {User} = require("../Model/User")

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
}

const findUserByPhone = async (phone) => {
    return await User.findOne({ phone });
}

const createUser = async (userData)=>{
    return await User.create(userData)
}

const updateUserByEmail = async (email, updates)=>{
    return await User.findOneAndUpdate({email}, updates, {new:true})
}


module.exports = {findUserByEmail, findUserByPhone, createUser, updateUserByEmail}
