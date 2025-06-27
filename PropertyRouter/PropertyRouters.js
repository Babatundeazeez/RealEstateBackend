const express = require("express")
const { addProperty, displayProperty } = require("../Controller/PropertyController")
const upLoadImage = require("../Services/nodemailer/Multer")


const propertyRouter = express.Router()






propertyRouter.post('/',upLoadImage.single("image"), addProperty)
propertyRouter.post('/', upLoadImage.single("image"), displayProperty )
module.exports = propertyRouter