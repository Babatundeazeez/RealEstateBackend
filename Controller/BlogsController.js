const blogModel = require("../Model/propertyBlogModel") 

const addBlog = async(req, res, next) => {

    const blogImage = req.file.path
    try {
        const blog = await blogModel.create({...req.body, image : blogImage})
        console.log(req.body);
        if (!blog){
            return res.status(400).json({
                status : "error",
                message : "content was not created"
            })
        }
        res.status(200).json({
            status : "success",
            message : "Blog post created successfully",
            blog
        })
        
        
    } catch (error) {
        console.log(error);
        
    }
    next(error)
}

const deleteBlogPost = async(req, res) => {
    const {id} = req.params
    try {
        const deleteBlog = await blogModel.findByIdAndDelete(id)
        if (!deleteBlog){
            return res.status(400).json({
                status : "error",
                message : "blog Post not deleted"
            })
        }
        res.status(200).json({
            status : "success",
            message : "blog post successfully upload"
        })
        
    } catch (error) {
        console.log(error);
        
        
    }
}

const getBlogPost = async(req, res, next) =>{
    try {
        const blogPost = await blogModel.find()
        if (!blogPost){
            return  res.status(400).json({
                status : "error",
                message : "Post not created"
            })
        }
        res.status(200).json({
            status : "success",
            message : " blog Post Create successfully",
            blogPost
        })
    } catch (error) {
        console.log("error", error);
        
        
    }
    next()

}

const getSingleBlogPost = async(req, res) => {
    const {id} = req.params
    try {
        const singleBlogPost = await blogModel.findById(id)
        if (!singleBlogPost){
            return res.status(401).json({
                status : "error",
                message : "Blog Post not found"
            })
        }
        res.status(200).json({
            status : "success",
            message : "Blog Post successfully posted",
            singleBlogPost
        })
        
    } catch (error) {
        console.log(error);
        
    }

}
module.exports = {
    addBlog,
    deleteBlogPost,
    getBlogPost,
    getSingleBlogPost
}