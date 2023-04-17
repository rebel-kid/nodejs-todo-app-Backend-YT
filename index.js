import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
mongoose.connect("mongodb://localhost:27017", {
    dbName: "backend",
}).then((c) => console.log("DB Connected")).catch((err) => console.log(err));

//now we need to create schema for whatever is gonna come into the DB -> JSON format data store in MongoDB
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
//after schema we need to create model -> basically a collection
const User = mongoose.model("User", userSchema)

//Above part was for Schema creation
const app = express();

//to use a middleware we need to use app.use()
app.use(express.static(path.join(path.resolve(), "public")));
//using middleware for accessing data from form in POST req.
app.use(express.urlencoded({ extended: true }));
//middleware for cookieParser
app.use(cookieParser());

// //Set up View Engine
app.set("view engine", "ejs");

//Authentication
const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    // console.log(token);  
    if (token) {
        const decoded = jwt.verify(token, "fuck you behenchod, maa ke lawde verto");
        req.user = await User.findById(decoded._id)
        next();
    }
    else {
        //undefined hoga token
        res.redirect("/login");
    }
}
app.get("/", isAuthenticated, (req, res) => {
    console.log(req.user);
    res.render("logout", { name: req.user.name });
});
//register route
app.get("/register", (req, res) => {
    res.render("register");
})

//login get route
app.get("/login", (req, res) => {
    res.render("login");
})

// login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.redirect("/register");
    //if user exits match password
    // const isMatch = user.password === password; ->do it using bcrypt as hashing is used
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render("login", {email, message: "Incorrect Password" });
    //if pwd matches -> make token and give access
    //create a token using jwt
    const token = jwt.sign({ _id: user._id }, "fuck you behenchod, maa ke lawde verto");
    // console.log(token);
    //instead of manually typing in the id's we are setting _id for the entire document
    res.cookie("token", token, {
        httpOnly: true, expires: new Date(Date.now() + 30 * 1000)
    });
    res.redirect("/");

})
//register ka post route
//show logout button if logged in, check by cookies
app.post("/register", async (req, res) => {
    //Login ka code
    //create a User in DB
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
        return res.redirect("/login");
    }
    //hash your password
    const hashedPassword = await bcrypt.hash(password, 10);

    //now add user in DB
    user = await User.create({
        name, email, password: hashedPassword
    })

    //create a token using jwt
    const token = jwt.sign({ _id: user._id }, "fuck you behenchod, maa ke lawde verto");
    // console.log(token);
    //instead of manually typing in the id's we are setting _id for the entire document
    res.cookie("token", token, {
        httpOnly: true, expires: new Date(Date.now() + 30 * 1000)
    });
    res.redirect("/");
})
//logout route
app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        httpOnly: true, expires: new Date(Date.now())
    });
    res.redirect("/");
})























//set post request for form 
app.post("/contact", async (req, res) => {
    const { name, email } = req.body;
    await Message.create({ name, email });
    res.redirect("success");    //we should redirect to a route, that's imp
})

//set success route for form submission
app.get("/success", (req, res) => {
    res.render("success");
})

app.get("/users", (req, res) => {
    res.json({ users });
})

app.listen(5000, () => {
    console.log("Server listening on port 5000");
})