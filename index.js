const express = require("express");
const connectToDB = require("./config/ConnectedDB");
const authRouter = require("./userAuthRouterss/userAuthRouter");
app = express()

const nigeriaStates = require("./utilities/nigeriaState.json")
const propertyFile = require("./utilities/property.json")
const propertyRouter = require("./PropertyRouter/PropertyRouters");

app.use(express.json())
app.use(express.urlencoded({extended : true}))
const cors = require("cors");

app.use(cors({
    origin:['https://real-estate-projects-54plt8pav.vercel.app'],
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

const userRouter = require("./userAuthRouterss/userRoutes");

const BlogRouters = require("./PropertyRouter/BlogRouter");
const errorHandlers = require("./MiddleWare/ErrorHandler");
const GeneralRouter = require("./PropertyRouter/GeUserRouter");


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
app.use('/api/generalUser', GeneralRouter)





//Model View Controller Router
app.get('/api/states', (req, res) =>{
    res.json(nigeriaStates)
})
app.get('/api/property', (req, res)=>{
    res.json(propertyFile)
})

// app.all("/*", (req, res) => {
//     res.json(`${req.method} ${req.originalUrl} is not an end point to this server`)
// })
app.use((req,res) =>{
    res.status(404).json({
        message : `${req.method} ${req.originalUrl} is not an end point to this server`
    })
})
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})
app.use(errorHandlers);

