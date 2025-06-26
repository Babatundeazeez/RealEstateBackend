const multer = require("multer")
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinaryConfig = require("./cloudinary")





const storage = new CloudinaryStorage({
    cloudinary : cloudinaryConfig,
    params : {
        folders : "realEstate-Project",
        allowedFormats : ['png','jpeg','jpg'],
        transformation : [{width : 500, height : 500}]
    }
})

const upLoadImage = multer({storage})
module.exports = upLoadImage