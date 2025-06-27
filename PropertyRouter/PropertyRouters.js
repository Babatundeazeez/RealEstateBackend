const express = require("express")
const { addProperty, displayProperty, getAllproperty } = require("../Controller/PropertyController")
const upLoadImage = require("../Services/nodemailer/Multer")


const propertyRouter = express.Router()






propertyRouter.post('/',upLoadImage.single("image"), addProperty)
propertyRouter.post('/', upLoadImage.single("image"), displayProperty )
propertyRouter.get('/',getAllproperty)
module.exports = propertyRouter