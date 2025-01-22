import mongooose from 'mongoose'

const connectDB = async () =>{
    try {
        await mongooose.connect(process.env.MONGO_URL)
        console.log("Database connected successfully")
    } catch (error) {
        console.log("Error while connecting to DB")
        throw error;
    }
}

export default connectDB;