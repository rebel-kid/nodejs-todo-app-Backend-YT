import mongoose from "mongoose";

//connect DB
export const connectDB = () => {
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "backend-api"
    })
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));
}