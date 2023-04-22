import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import {sendCookie} from "../utils/features.js";
// export const getAllUsers = async (req, res) => {
    //can create for specific Admin view, but not needed as of now
// }

export const registerUser = async (req, res,next) => {
const {name, email, password} = req.body;
let user = await User.findOne({email});
if(user) return next(new ErrorHandler("User Already Exists",403)); 
//create User if not exits
const hashedPassword = await bcrypt.hash(password, 10);
user = await  User.create({name, email, password: hashedPassword});

//send cookies, generate token
sendCookie(user, res, "Registered Successfully", 201);
}
//we can also send cookies to redirect to login after successful registration -> user cookies -> will use token -> JWT

export const loginUser = async (req,res,next) => {
try {
    const {email, password} = req.body;
const user = await User.findOne({email}).select("+password");

if(!user) return next(new ErrorHandler("Invalid Email or Password",400)); 


//now check for authenticity of the password, user exists
const isMatch = await bcrypt.compare(password, user.password);
//if pwd not match, throw same error, as we will not tell what is wrong email or pwd
// if(!isMatch) return res.status(403).json({
//     success: false,
//     message: "Invalid Email or Password"
// });
if(!isMatch) return next(new ErrorHandler("Invalid Email or Password",400)); 

//everything match, login user
sendCookie(user, res, `Welcome back ${user.name}`, 200);
} catch (error) {
    next(error);
}
}

//use tryCatch block with async await functions
export const getMyDetails = (req, res) => {
    //all auth and data is being handled by middleware
  res.status(200).json({
    success: true,
    user: req.user,
  })
}

export const logoutUser = (req,res) => {
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV==="Dev"?"lax":"none", 
        secure: process.env.NODE_ENV==="Dev"? false:true
    }).json({
        success:true,
        user: req.user,
        message:"Logged Out Successfully"
    })
}