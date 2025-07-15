const jwt = require("jsonwebtoken")
const usersModel = require("../Model/userModel")


const isLoggedIn = async(req, res, next) =>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

        token = req.headers.authorization.split(' ')[1]
    }
    if (!token){
            return res.status(400).json({
                status : "error",
                message : "Please provide token, No token generated, authorization denied"
            })
        }
       try {
        const decoded = jwt.verify(token, process.env.jwt_pass);
        const user = await usersModel.findById(decoded.id)

        if(!user){
            return res.status(400).json({
                status : "Error",
                message : "This token belongs to no one"
            })
        }

        req.user = user
        next()

        console.log(req.user);

       } catch (error) {
        return res.status(401).json({message : "Token failed"})
       }


        

    //    try {
    //     token = req.headers.authorization.split(' ')[1]
        
    //     const decoded = jwt.verify(token, process.env.jwt_pass);
    //     req.user = await usersModel.findById(decoded.id).select("password")



    //    } catch (error) {
    //     console.log("Authentication failed", error);
    //     return res.status(401).json({message : "Not Authorized, token failed"})
        
    //    }
    
    // if (!token){
    //     return res.status(401).json({message : "Not authorized, no token"})
    // }
    // let authHeader = req.headers.Authorization || req.headers.authorization
    // if (authHeader && req.headers.authorization.startsWith("Bearer")){
    //     token = authHeader.split(' ')[1]
    // }

    // if (!token){
    //     return res.status(400).json({
    //         status : "error",
    //         message : "No token generated, authorization denied"
    //     })
    // }
    //if the token is valid
    // const decoded = jwt.verify(token, process.env.jwt_pass)
    // console.log(decoded);
    
    // try {
    //     const decoded = jwt.verify(token, process.env.jwt_pass)
    //   //  req.user = decoded
    //    // console.log("The decoded user is : ", req.user);
    //    console.log(decoded);
       
    //     next()
        
        
    // } catch (error) {
    //     res.status(401).json({message : "Token is not valid"})
    // }

    //find the user that has the token

    // const user = await userModel.findById(decoded.id)
    // if(!user){
    //     return res.status(400).json({
    //         status : "Error",
    //         message : "This token belongs to no one"
    //     })
    // }
    // req.user = user


}
module.exports = isLoggedIn