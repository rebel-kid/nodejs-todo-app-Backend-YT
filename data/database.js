import mongoose from "mongoose";

//connect DB
export const connectDB = () => {
    mongoose
    .connect(process.env.MONGO_URI, {
        dbName: "backend-api"
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((err) => console.log(err));
}