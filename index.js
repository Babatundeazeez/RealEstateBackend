const express = require("express");
const connectToDB = require("./config/ConnectedDB");
const authRouter = require("./userAuthRouterss/userAuthRouter");
app = express()

const nigeriaStates = require("./utilities/nigeriaState.json")

app.use(express.json())
const cors = require("cors")
app.use(cors())

connectToDB()
const PORT = 1300;
app.listen(PORT, ()=>{
    console.log("Listening to port " + PORT);
    
})

app.use('/api/auth', authRouter)
//Model View Controller Router
app.get('/api/states', (req, res) =>{
    res.json(nigeriaStates)
})

