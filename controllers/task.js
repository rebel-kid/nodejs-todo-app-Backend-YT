import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req,res,next) =>{
    try {
        const {title, description} = req.body;
    await Task.create({
        title,
        description,
        user: req.user,
    });

    res.status(201).json({
        success: true,
        message: "Task added successfully"
    })
    } catch (error) {
        next(error);
    }
}

export const getMyTasks = async (req,res,next) =>{
    try {
        const userId = req.user._id;
    const tasks = await Task.find({user: userId});

    res.status(200).json({
        success: true,
        tasks, //array of tasks will be returned by find method
    })
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req,res,next) =>{
    try {
        const {id} = req.params;
    const task = await Task.findById(id);

    // if(!task){
    //     return res.status(404).json({
    //         success: false,
    //         message: "Task Not Found"
    //     })
    // }
    //using middleware error handling, next()
    if(!task) return next(new ErrorHandler("Task Not Found",404)); 

    task.isCompleted = !task.isCompleted; //boolean
    await task.save();  //promise return

    res.status(200).json({
        success: true,
        message: "Task Updated Successfully"
    })
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req,res,next) =>{
    try {
        const task = await Task.findById(req.params.id);

    if(!task) return next(new ErrorHandler("Task Not Found",404)); 
    
   await task.deleteOne();
    res.status(200).json({
        success: true,
        message: "Task Deleted Successfully"

    })
    } catch (error) {
        next(error)
    }
}