import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("failed to connect mongoDB", error);
        process.exit(1);
    }
}