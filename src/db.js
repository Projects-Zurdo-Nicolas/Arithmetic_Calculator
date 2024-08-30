import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost/truenorthdb'); //Es asincrono por lo que coloco await
        console.log(">>> DB is connected");
    }catch(error)
    {
        console.log(error);
    }
};
