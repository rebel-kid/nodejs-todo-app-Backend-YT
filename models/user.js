    import mongoose from "mongoose";
//create User Schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        select: false,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }



    
});
//create Model Schema for User
export const User = mongoose.model("User", userSchema)

