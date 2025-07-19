const express = require("express")
const { generalUser } = require("../Controller/UserController")
const GeneralRouter = express.Router()



GeneralRouter.post('/', generalUser)


module.exports = GeneralRouter