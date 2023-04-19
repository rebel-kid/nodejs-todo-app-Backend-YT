import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
    const users = await User.find({})
    console.log(req.query);
    const keyword = req.query.keyword;
    console.log(keyword);
    res.json({
        success: true,
        users: users
    });
}

export const registerUser = async (req, res) => {

    //get data from forms
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password
    })
    res.status(201).cookie("TempCookie", "LoL").json({
        success: true,
        message: "Registered Successfully"
    });
}

export const specialFunction = (req, res) => {
    res.json({
        success: true,
        message: "Just Joking"
    })
}

export const getUserByID = async (req, res) => {
    // const {id} = req.body;//tried req.query also, doing dynamic
    const { id } = req.params;
    const user = await User.findById(id);
    // console.log(req.params);
    res.json({
        success: true,
        user
    })

}

export const updateUser = async (req, res) => {
    // const {id} = req.body;//tried req.query also, doing dynamic
    const { id } = req.params;
    const user = await User.findById(id);
    // console.log(req.params);
    res.json({
        success: true,
        message: "Updated Successfully"
    })

}

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({
        success: true,
        message: "Deleted Successfully"
    })

}