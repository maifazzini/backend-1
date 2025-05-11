import mongoose from "mongoose";

const connectMongoDB = async ()=>{
    try{
        await mongoose.connect(
            process.env.MONGODB
        )
        console.log("Se conecto con exito a MongoDB")
    }
    catch(error){
        console.log(error.messaje)
    }
}
export default connectMongoDB