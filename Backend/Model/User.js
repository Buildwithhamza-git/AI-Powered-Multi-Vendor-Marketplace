const mongoose = require("mongoose"); 

const Signupschema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 15
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 15
    },
    role: {
        type: String,
        required: true,
        enum: ["buyer", "seller"]
    },
    storename: {
        type: String,
        required: function() {
            return this.role === "seller";
        },
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true 
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 60
    },
    Otp:{
        type:String,
        default:null
    },
    OtpExpire:{
        type: Date,
        default:null
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    phone: {
        type: String,  
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[0-9]{11}$/.test(value);
            },
            message: "Phone number must be exactly 11 digits"},
    }
}, {
    timestamps: true
});
 
const User = mongoose.model("User", Signupschema); 

module.exports = { User };
