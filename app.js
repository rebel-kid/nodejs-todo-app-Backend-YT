import express from "express";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
export const app = express();

//config file
config({
    path: "./data/config.env",
})

//middlewares
app.use(express.json());
//routes
app.use("/api/v1/users",userRouter);


app.get("/", (req, res) => {
    res.send("Nice")
})



