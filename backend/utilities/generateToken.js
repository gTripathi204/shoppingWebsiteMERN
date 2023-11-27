const jwt = require("jsonwebtoken") ;
const signature = process.env.JWT_SECRET_KEY ;


const generateTokenFun = (data) =>{
    const token =  jwt.sign(data,signature,{
        expiresIn:"15d"
    }) ;
    return token ;
}


module.exports={generateTokenFun} ;
