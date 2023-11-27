const mongoose = require("mongoose") ;
const dotenv = require("dotenv") ;

dotenv.config() ;



const connectDB = mongoose.connect(process.env.MONGODB_CONNECT_LINK , {
    useNewUrlParser: true,
    useUnifiedTopology: true
 })

 module.exports = {connectDB} ;