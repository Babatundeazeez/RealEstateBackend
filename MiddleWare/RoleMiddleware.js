const authorizeRole = (...grantRoles) =>{
    return(req, res, next) =>{
        if (!grantRoles.includes(req.user.role)){
            return res.status(402).json({
                status : "error",
                message : "Access Deniel"
            })

        }
        next()
    }


}
module.exports = authorizeRole