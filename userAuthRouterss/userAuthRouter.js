const express = require("express")
const { signUp, signIn, emailVerify } = require("../Controller/userAuthController")

const authRouter = express.Router()

authRouter.post('/signUp', signUp)
authRouter.post('/signIn', signIn)
authRouter.post('/verify/:token', emailVerify)


module.exports = authRouter