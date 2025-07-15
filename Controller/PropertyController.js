const propertyModel = require("../Model/propertyModel")
const { patch } = require("../PropertyRouter/PropertyRouters")




// const addProperty = async(req, res) =>{
//     if (!req.file){
//         return res.status(400).json({
//             status : "error",
//             message : "No file was found"
//         })

//     }
//     const myimage = req.file.path

    
//     try {
//         const property = await propertyModel.create(
//             {...req.body,
//             image: myimage,
//               listedBy : req.user.id,
//                status : "pending" 
//             })
//         console.log(req.body);
//         console.log("req.user =>", req.user);
        
//         console.log("User ID", req.user.id);
        
       
        
//         if(!property){
//             return res.status(400).json({
//                 status :"error",
//                 message : "Property was not Added"
//             })
//         }
        
//         res.status(200).json({
//             status : "successfully",
//             message : "Property was successfully submitted and awaiting for approver",
//             property
//         })
        
//     } catch (error) {
//         console.error("Add property error", error)
//             res.status(500).json({
//                 status : "error",
//                 message : "Internal server error"
//             })
          
//     }
// }
const displayProperty = async(req, res) =>{

    const proImage = req.file.path
    try {
        const userProperty = await propertyModel.create({
            ...req.body,
            image : proImage,
            listedBy : req.user.id,
            status : "pending"

        })

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

  //Approved property///////////////////////////////////////
  const approveProperty = async(req, res) =>{
   
    try {
        const property = await propertyModel.findByIdAndUpdate(req.params.id, {status : "approved"}, {new : true})
        
        if(!property){
            return res.status(401).json({
                status : "Error",
                message : "Approver failed"
            })
        }
        res.status(201).json({
            status : "success",
            message : "Property approved",
            property
        })
        
    } catch (error) {
        console.log("Approver error",error);
        res.status(500).json({message : "server Error", error:err.message})
        
    }

}

  //////////rejectProperty ///////////////////////////////////////
  const disApprovedProperty = async(req, res) =>{
    try {
        const deleteProperty = await propertyModel.findByIdAndUpdate(req.params.id, {status : "disapproved"},{new : true})
        if (!deleteProperty){
            res.status(402).json({
                status : "error",
                message : "failed to reject property"
            })
        }
        res.status(200).json({
            status : "success",
            message : "Property rejected",
            deleteProperty
        })
    } catch (error) {
        console.log("Disapprove Error", error);
        res.status(500).json({message : "Server Error", error:err.message})
        
    }

}

//////Get Approved Property////////////////////////////

const getApproveProperty = async(req, res) =>{
    try {
        const approvedProperty = await propertyModel.find({status : "approved"})

        if(!approvedProperty){
            return res.status(500).json({
                status : "error",
                message : "Internaal Server error"
            })
        }
        res.status(201).json({
            status : "success",
            message : "ApprovedProperties",
            approvedProperty
            
        })
        
    } catch (error) {
        console.log("Error fecthing Approved properties", error);
        
        
    }

}

///////////////////////////////////////////////////////////////////


        // const getAllproperty = async(req, res) =>{
        //     try {
        //         const myProperty = await propertyModel.find()
        //         if(!myProperty){
        //             return res.status(401).json({
        //                 status : "error",
        //                 messsage : "property not found"
        //             })
        //         }
        //         res.status(201).json({
        //             status : "success",
        //             message : "property found ",
        //             myProperty
        //         })
                
        //     } catch (error) {
        //         console.log(error);
                
        //     }

        // }

        /////////////////////////////////////////////
        const getSingleProperty = async(req, res, next) =>{
            const {id} = req.params

           
            try {
                const singleProperty = await propertyModel.findById(id)
                if (!singleProperty){
                    return res.status(400).json({
                        status : "error",
                        message : "Property not found"
                    })
                }
                res.status(201).json({
                    status : "success",
                    message : "property found",
                    singleProperty
                })
                
            } catch (error) {
                console.log(error);
                
            }
        }


      
        /////////////////////////////////////////////////////////////////
      

        /////////////pendingProperty///////////////////////////////////

        const getPendingProperty = async(req, res) =>{
            try {
                const pendingProperty = await propertyModel.find({status : "pending"});
                res.status(200).json({message : "pending", pendingProperty})
                
            } catch (error) {
                res.status(500).json({error : "Could not fetch pending properties"})
                console.log("error", error);
                
            }

        }
        //////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////
        // const getAllApproveProperty = async(req, res) =>{
        //     try {
        //         const properties = await propertyModel.find({status : "approve"})

        //         if (!properties){
        //             return res.status(401).json({
        //                 status : "Error",
        //                 message : "Failed to get property approved"
        //             })
        //         }
        //         res.status(200).json({
        //             status : "success",
        //             message : "property Fetch",
        //             properties
        //         })
                
        //     } catch (error) {
                
        //     }
        // }



module.exports = {
   // addProperty,
    displayProperty,
   // getAllproperty,
    getSingleProperty,
    approveProperty,
    getApproveProperty,
    //getAllApproveProperty,
    disApprovedProperty,
    getPendingProperty

}
