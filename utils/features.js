import jwt from "jsonwebtoken";

//send cookies, generate token
export const sendCookie = (user, res, message, statusCode = 200) => {
const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

res.status(statusCode).cookie("token",token,{
    httpOnly: true,
    maxAge: 1000 * 60 * 15 , 
    sameSite: process.env.NODE_ENV==="Dev"?"lax":"none",   //manages that front end and backend are on same URL, which cant be true, so make it none, and use secure as true -> must
    //adding sameSite and secure, will result not to work in postman, as postman is same site, and secure is true, so cookies are blocked and not come in postman
    secure: process.env.NODE_ENV==="Dev"? false:true
}).json({
    success: true,
    message
})
}