const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    occupation : {
        type : String,
        required : true
    },
    sex : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : [true, "Email Already exist"]
    },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type : String,
    },
    Phone : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        enum : ["buyer", "Owner", "Developer", "Agent"],
        default : "buyer"
    },
    verified : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    verificationToken : {
        type : String
    },
    verificationExp : {
        type : String
    }
})
const usersModel = mongoose.model("users", userSchema)
module.exports = usersModel