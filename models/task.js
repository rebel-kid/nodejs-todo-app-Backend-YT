import mongoose from "mongoose";
//create User Schema
const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user:{
        //user who created this task, details about that
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});
//create Model Schema for Task

export const Task = mongoose.model("Task", TaskSchema)

