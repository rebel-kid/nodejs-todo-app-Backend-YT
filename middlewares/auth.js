import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
    //the issue is we dont have id, so we need to check if we are login or not at the moment, because if we are we can access the id from the token
const {token} = req.cookies;
//check if token does not exists
if(!token) return res.status(403).json({
    success: false,
    message: "Log In First to Access"
});
//if token exists decode the data and then use it to find id of the user
const decodedData = jwt.verify(token, process.env.JWT_SECRET);
req.user = await User.findById(decodedData._id);
next(); //call this after authentication
}