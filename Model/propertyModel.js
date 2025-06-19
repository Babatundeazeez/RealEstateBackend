const mongoose = require("mongoose")

const propertySchema = new mongoose.Schema({
    tile : {
        type : String,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    location : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    image : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    contact : {
        type : Number,
        require : true
    },
    propertyInfo : {
        type : String,
        require : true
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    developer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    listedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }

})

const propertyModel = mongoose.model("property", propertySchema)
module.exports = propertyModel