const dotenv = require("dotenv");
const mongoose = require('mongoose');
dotenv.config();

const mongoString = process.env.DATABASE_URL;

const connectDB = async function connection(){

    try{
        mongoose.connect(mongoString,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }).then(()=>{
            console.log("Connection has been established successfully");
        }).catch((e)=>{
            console.log("ECON: ",e);
        })
    }catch(error){
        console.log(error);
    }

}

module.exports = connectDB;
