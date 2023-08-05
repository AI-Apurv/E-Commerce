import mongoose from 'mongoose';


const dbConnection  = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/E-commerce_db");
        console.log("Connected to MongoDB")
    }
    catch(error)
    {
        console.error("Error connecting to MongoDB",error);
    }
}

export {dbConnection};