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

const displayProperty = async(req, res) =>{

    const proImage = req.file.path
    try {
        const userProperty = await propertyModel.create({...req.body, image : proImage})
        console.log(req.body);
        if(!userProperty){
            return res.status(4003).json({
                status : "error",
                message : "property is not added"
            })
        }
        res.status(201).json({
            status : "success",
            message : "property was added successfully",
            userProperty
        })
        
        
    } catch (error) {
        res.status(500).json({
            status : "error",
            message : "server error"
        })
    }

        }

        const getAllproperty = async(req, res) =>{
            try {
                const myProperty = await propertyModel.find()
                if(!myProperty){
                    return res.status(401).json({
                        status : "error",
                        messsage : "prperty not found"
                    })
                }
                res.status(201).json({
                    status : "success",
                    message : "property found ",
                    myProperty
                })
                
            } catch (error) {
                console.log(error);
                
            }

        }



module.exports = {
    addProperty,
    displayProperty,
    getAllproperty

}
