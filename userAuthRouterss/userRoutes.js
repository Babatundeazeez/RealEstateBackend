const { propertyOwner, developer, propertyUser, agent, admin } = require("../Controller/userAuthController")

const express = require("express")
const verifyToken = require("../MiddleWare/UserVerification")
const authorizeRole = require("../MiddleWare/RoleMiddleware")


const userRouter = express.Router()

//only Owner can access this
userRouter.get('/owner', verifyToken, authorizeRole("owner", "admin"), propertyOwner)
//only Developer can access this
userRouter.get('/developer',verifyToken, authorizeRole("developer", "admin"), developer)
//only User can access this
userRouter.get('/buyer', verifyToken, authorizeRole("buyer", "admin"), propertyUser)
//All Agent can acccess
userRouter.get('/agent', verifyToken, authorizeRole("agent", "admin"), agent)
// admin should have access to all pages
userRouter.get('/admin', verifyToken, authorizeRole("admin"), admin)

module.exports = userRouter