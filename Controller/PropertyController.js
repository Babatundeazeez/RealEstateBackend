const propertyModel = require("../Model/propertyModel")




const addProperty = async(req, res) =>{
    if (!req.file){
        return res.status(400).json({
            status : "error",
            message : "No file was found"
        })

    }
    const myimage = req.file.path

    
    try {
        const property = await propertyModel.create({...req.body, image: myimage})
        console.log(req.body);
        
        if(!property){
            return res.status(400).json({
                status :"error",
                message : "Property was not Added"
            })
        }
        res.status(200).json({
            status : "successfully",
            message : "Property was successfully added",
            property
        })
        
    } catch (error) {
        console.error("Add property error", error)
            res.status(500).json({
                status : "error",
                message : "Internal server error"
            })
        
        
    }
}
module.exports = {
    addProperty,

}
