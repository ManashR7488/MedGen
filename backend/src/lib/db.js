
import mongoose from 'mongoose';
import {colorText, colors} from "./colorText.js";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log(colorText(`MongoDB connected: ${mongoose.connection.host}`, colors.cyan));
    } catch (error) {
        console.error(colorText(`MongoDB connection error: ${error}`, colors.red));
    }
}