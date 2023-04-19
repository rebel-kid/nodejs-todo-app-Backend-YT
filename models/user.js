import mongoose from "mongoose";
//create Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
//create model
export const User = mongoose.model("User", userSchema)

