import mongoose from "mongoose";

const connectMongoDB = async ()=>{
    try{
        await mongoose.connect(
            "mongodb+srv://maia:maia123@backend1.oxyq4ro.mongodb.net/backend1?retryWrites=true&w=majority&appName=backend1"
        )
        console.log("Se conecto con exito a MongoDB")
    }
    catch(error){
        console.log(error)
    }
}
export default connectMongoDB