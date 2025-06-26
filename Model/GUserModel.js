const mongoose = require("mongoose")
const GuestUserSchema = new mongoose.Schema({

    names : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true
    },
    description : {
        type : String,
        require : true
    }


})
const GusersModel = mongoose.model("GUsers",GuestUserSchema)
module.exports = GusersModel