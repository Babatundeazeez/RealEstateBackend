const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const usersModel = require("../Model/userModel")
const sendVerificationEmail = require("../Services/nodemailer/sendEmailVerification")
const generateRandomstring = require("../utilities/GenerateRandomToken")
const GusersModel = require("../Model/GUserModel")






//////////////Function for sign up ///////////////////////////////////////////
const signUp = async(req, res) =>{

    const {password,email, name, role} = req.body

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const token = generateRandomstring(8)
        const verificationExp = Date.now() + 300000

        const user = await usersModel.create({...req.body, password : hashPassword, role, verificationToken : token, verificationExp  })

        if (!user){
            return res.status(400).json({
                status : "error",
                message : "could not sign up "
            })
        }
        const userName = name.split(" ")[0]
        res.status(200).json({
            status : "success",
            message : "Sign Up successfully ! Please check your email for verification",
            user
        })
        sendVerificationEmail(email,userName, token)
        
    } catch (error) {
        console.log(error);
        
    }
}
///////////////function to verify email/////////////////
const emailVerify = async( req, res) =>{
    const {token} = req.params
    try {
        const user = await usersModel.findOne({verificationToken : token})
        if (!user){
            return res.status(400).json({
                error : "error",
                message : "This token is invalid or has been verified"
            })
        }
        ///check token expiration time//////////////////////
        if (user.verificationExp < Date.now()){
            return res.status(403).json({
                error : "error",
                message : "Verification time has expire"
            
            })
        }
       // alert("Verification time has expire")

        ///////email has been verify//////////////////////

        await usersModel.findByIdAndUpdate(user._id, {verificationExp : null, verificationToken : null, verified: true})
        res.status(200).json({
            status: "success",
            message : "Your Email has been verify, kindly proceed to login page"
        })
        // ("Your Email has been verify, kindly proceed to login page")
        
    } catch (error) {
        console.log(error);
        
    }
}


///FrontUser made a request on property/////////////
const frontUser = async(req, res) =>{
    const {names, email, phone, description} = req.body
    try {
        const fUser = await GusersModel.create({names, email, phone, description})

        res.status(202).json({message : "Your request has been sent successfully"}),
        fUser
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message : "something went wrong"})
        
    }

    sendVerificationEmail(names, email)

}
/////////////////////////////////////////////////////////////////////
////////////////////////////////////////////









/////////////////////////// function for sign in///////////////////////////////////
const signIn = async (req, res) =>{
    const {email, password} = req.body
    try {
        const user = await usersModel.findOne({email})
        if (!user){
            return res.status(400).json({
                status : "error",
                message : "Email or Password is incorrect"
            })
        }
        // verify if the password is correct
        const correctedPassword = await bcrypt.compare(password, user.password)

        if(!correctedPassword){
            return res.status(400).json({
                status : "error",
                message : "Email or Password is incorrect"
            })
        }
        //generate accessToken for the user
        const accessToken = jwt.sign({id: user._id, role: user.role, email: user.email}, process.env.jwt_pass,{expiresIn : process.env.tokenExp})
        
        res.status(200).json({
            status : "success",
            mesage : "Sign In successfully, please proceed to the dashboard",
            user,
            accessToken
        })


        
    } catch (error) {
        console.log(error);
        
    }

}
///////////////////////////////////////////////////////////////////////////////////////

const propertyOwner = async(req, res) =>{
    try {
        res.json({message : "Welcome to property owner page"})
        
    } catch (error) {
        console.log(error);
        
    }

}
const developer = async(req, res) =>{
    try {
        res.json({message : "Welcome to Developer/build page"})
        
    } catch (error) {
        console.log(error);
        
    }

}
const propertyUser = async(req, res) =>{
    try {
        res.json({message : "Welcome to User/buyer page"})
        
    } catch (error) {
        console.log(error);  
    }
}
const agent = async(req, res) =>{
    try {
        res.json({message : "Welcome to agent/comission page"})
        
    } catch (error) {
        console.log(error);  
    }
}
const admin = async(req, res) =>{
    try {
        res.json({message : "Welcome to admin/over see all page"})
        
    } catch (error) {
        console.log(error);  
    }
}
///////////////////////////////////////////////////////

module.exports = {
    signUp,
    signIn,
    emailVerify,
    propertyOwner,
    developer,
    propertyUser,
    agent,
    admin,
    frontUser
}