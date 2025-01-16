import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Is Connected")
    } catch (error) {
        console.log("Error Connecting To Database")
        console.log("Error Connecting to Database: ", error)
    }

} 
export default connectDB