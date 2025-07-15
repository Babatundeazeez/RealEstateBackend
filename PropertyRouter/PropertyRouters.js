const express = require("express")
const { addProperty, displayProperty, getAllproperty, getSingleProperty, approveProperty, getAllApproveProperty, rejectProperty, getPendingProperty, getApproveProperty, disApprovedProperty } = require("../Controller/PropertyController")
const upLoadImage = require("../Services/nodemailer/Multer")
const isLoggedIn = require("../MiddleWare/UserVerification")
const isAdmin = require("../MiddleWare/isAdmin")


const propertyRouter = express.Router()






//propertyRouter.post('/property', isLoggedIn, upLoadImage.single("image"), addProperty)
propertyRouter.post('/',isLoggedIn, upLoadImage.single("image"), displayProperty)
propertyRouter.patch('/approve/:id',isLoggedIn, isAdmin, approveProperty)
propertyRouter.get('/approved', getApproveProperty)
propertyRouter.get('/pending', isLoggedIn, isAdmin, getPendingProperty)
propertyRouter.patch('/disapprove/:id',isLoggedIn, isAdmin, disApprovedProperty)

//propertyRouter.get('/',getAllproperty)




//propertyRouter.patch('/approved',isLoggedIn, isAdmin, approveProperty)


//propertyRouter.get('/',getAllApproveProperty)


propertyRouter.get('/:id', getSingleProperty)





module.exports = propertyRouter 