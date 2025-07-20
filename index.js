const express = require("express");
const connectToDB = require("./config/ConnectedDB");
const authRouter = require("./userAuthRouterss/userAuthRouter");
const userRouter = require("./userAuthRouterss/userRoutes");
const BlogRouters = require("./PropertyRouter/BlogRouter");
const GeneralRouter = require("./PropertyRouter/GeUserRouter");
const propertyRouter = require("./PropertyRouter/PropertyRouters");
const errorHandlers = require("./MiddleWare/ErrorHandler");

const nigeriaStates = require("./utilities/nigeriaState.json")
const propertyFile = require("./utilities/property.json")

const cors = require("cors");
const app = express()
app.use(express.json())

app.use(express.urlencoded({extended : true}))

const allowedOrigins =[
    "http://localhost:5173",
    'https://real-estate-projects-54plt8pav.vercel.app',
    "https://real-estate-projects-bbp9-7m0qj5qjm.vercel.app"

]

app.use(cors({
    origin: function( origin, callback) {
        if (!origin || allowedOrigins.includes(origin)){
            callback(null, true);

        }else{
            callback (new Error("Not allowed byCORS"))
        }
    },
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


connectToDB()


///connect to dbMongose//////////////
const PORT = 1300;
app.listen(PORT, ()=>{
    console.log("Listening to port " + PORT);
    
})
//////////Router///////////////////////////
app.use('/api/auth', authRouter)

app.use('/api/property', propertyRouter)
//app.use('/api/users',userRouter)
app.use('/api/blog', BlogRouters)
app.use('/api/generalUser', GeneralRouter)





//Model View  utility endpoint  Router
app.get('/api/states', (req, res) =>{
    res.json(nigeriaStates)
})
app.get('/api/property', (req, res)=>{
    res.json(propertyFile)
})

/////Allow header///////////////////
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})

/////Only 404 hander///////////
app.use((req,res) =>{
    res.status(404).json({
        message : `${req.method} ${req.originalUrl} is not an end point to this server`
    })
})



app.use(errorHandlers);

