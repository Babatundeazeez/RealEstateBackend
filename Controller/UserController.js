const GusersModel = require("../Model/GUserModel");

const generalUser = async(req, res) => {
    try {
        const user = await GusersModel.create({...req.body})
        console.log(req.body);
        
        if (!user){
            return res.status(400).json({
                status : "error",
                message : "Could not create user"
            })
        }
        res.status(200).json({
            status : "success",
            message : "user created successfully",
            user
        })
        
    } catch (error) {
        console.log(error);
        
    }
    //next(error)

}

module.exports = {
    generalUser
}