const express = require("express")
const { addProperty } = require("../Controller/PropertyController")
const upLoadImage = require("../Services/nodemailer/Multer")


const propertyRouter = express.Router()






propertyRouter.post('/',upLoadImage.single("image"), addProperty)
module.exports = propertyRouter