const fs = require("fs");
const productModule = require("./models/productsModel");
const productdata = require("./data/products");
const userData = require("./data/users");
const userModel = require("./models/user");
const connecrtDB = require("./config/config")


connecrtDB.connectDB.then(()=>{
    console.log("Database Connected") ;
}).catch((err)=>{
    console.log(err) ;
})


const importData = async () => {
  try {
    await userModel.deleteMany();
    await userModel.create(userData);
    await productModule.deleteMany();
    await productModule.create(productdata);
    console.log("Data Imported");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const destoryData = async () =>{
    try {
        await userModel.deleteMany();
        await productModule.deleteMany() ;
    } catch (err){
        console.log(err) ;
    }
}

if(process.argv[2]==="-d"){
    destoryData() ;
} else {
    importData() ;
}
