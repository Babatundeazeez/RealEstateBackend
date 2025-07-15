const express = require("express");
const connectToDB = require("./config/ConnectedDB");
const authRouter = require("./userAuthRouterss/userAuthRouter");
app = express()

const nigeriaStates = require("./utilities/nigeriaState.json")
const propertyFile = require("./utilities/property.json")
const propertyRouter = require("./PropertyRouter/PropertyRouters");

app.use(express.json())
const cors = require("cors");
const userRouter = require("./userAuthRouterss/userRoutes");

const BlogRouters = require("./PropertyRouter/BlogRouter");

app.use(cors())
///connect to dbMongose//////////////
connectToDB()
const PORT = 1300;
app.listen(PORT, ()=>{
    console.log("Listening to port " + PORT);
    
})
/////////////////////////////////////

app.use('/api/auth', authRouter)
app.use('/api/property', propertyRouter)

app.use('/api/users',userRouter)
app.use('/api/blog', BlogRouters)





//Model View Controller Router
app.get('/api/states', (req, res) =>{
    res.json(nigeriaStates)
})
app.get('/api/property', (req, res)=>{
    res.json(propertyFile)
})

