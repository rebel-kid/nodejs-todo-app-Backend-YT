import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
export const getAllUsers = async (req, res) => {
    
}

export const registerUser = async (req, res) => {
const {name, email, password} = req.body;
let user = await User.findOne({email});
if(user) return res.status(403).json({
    success: false,
    message: "User Already Exists"
});
//create User if not exits
const hashedPassword = await bcrypt.hash(password, 10);
user = await  User.create({name, email, password: hashedPassword});

//send cookies, generate token
const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

res.status(201).cookie("token",token,{
    httpOnly: true,
    maxAge: 1000 * 10, 
}).json({
    success: true,
    message: "Registered Successfully"
})
}
//we can also send cookies to redirect to login after successful registration -> user cookies -> will use token -> JWT
export const loginUser = async (req,res) => {

}

export const getUserByID = async (req, res) => {
  
}