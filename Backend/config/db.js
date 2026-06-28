const mongooose = require("mongoose")

const connectDB = async ()=>{
    try{
        await mongooose.connect(process.env.MONGODB_URL)

        console.log("Connection Successful")

    }catch(err){

        console.log(`Db Connection Error: ${err}`);
    }
}

module.exports = {connectDB}