const express = require("express")
const upLoadImage = require("../Services/nodemailer/Multer")
const { addBlog, deleteBlogPost, getBlogPost, getSingleBlogPost } = require("../Controller/BlogsController")
const isLoggedIn = require("../MiddleWare/UserVerification")
const isAdmin = require("../MiddleWare/isAdmin")


const BlogRouters = express.Router()

BlogRouters.post('/', upLoadImage.single("image" ), addBlog)
BlogRouters.get('/', getBlogPost)
BlogRouters.get('/:id', getSingleBlogPost)

BlogRouters.delete('/:id', deleteBlogPost)
module.exports = BlogRouters