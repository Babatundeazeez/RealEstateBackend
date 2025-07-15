const isAdmin = (req, res, next) =>{
    if(req.user && req.user.role === "admin"){
        next()
    }
    else{
        return res.status(400).json({
            status : "error",
            message : "Access Denied. Admins only can add property"
        })
    }

}

module.exports = isAdmin