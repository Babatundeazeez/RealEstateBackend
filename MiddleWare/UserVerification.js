const jwt = require("jsonwebtoken")
const userModel = require("../Model/userModel")

const verifyToken = async(req, res, next) =>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && req.headers.authorization.startsWith("Bearer")){
        token = authHeader.split(' ')[1]
    }

    if (!token){
        return res.status(400).json({
            status : "error",
            message : "No token generated, authorization denied"
        })
    }
    //if the token is valid
    try {
        const decode = jwt.verify(token, process.env.jwt_pass)
        req.user = decode
        console.log("The decoded user is : ", req.user);
        next()
        
        
    } catch (error) {
        res.status(401).json({message : "Token is not valid"})
    }


}
module.exports = verifyToken