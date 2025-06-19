const crypto = require("crypto")

const generateRandomstring = (num=6) =>{
    const token = crypto.randomBytes(num).toString("hex")
    return token
}
module.exports = generateRandomstring