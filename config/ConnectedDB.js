const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const mongoDb_Urls = process.env.MongoDB_Url
const connectToDB = async()=>{

    try {
        const connected = await mongoose.connect(mongoDb_Urls)
        console.log("connecting......");
        
        if (connected){
            console.log("MongoDB is connected.......");
            
        }
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports = connectToDB