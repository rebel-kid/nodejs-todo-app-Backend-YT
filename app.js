import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import {errorMiddleware} from "./middlewares/error.js";
import cors from "cors";
export const app = express();

//config file
config({
    path: "./data/config.env",
})

//middlewares
app.use(express.json());
app.use(cookieParser()); //need cookie parser to fetch user id from token generated, as user will be logged in, cookie will be there
//routes
//adding workaround for cors issue
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, application/json');
     // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
  });
//use middleware before routes
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);
// app.use(cors({
//     // origin: [process.env.FRONTEND_URL], //origin means from which domain, all origin requests are allowed
//     origin: ["*"], //checking cors workaround
//     methods: ["GET", "POST", "PUT", "DELETE"], //which methods will be allowed
//     credentials: true, //credentials to be saved on frontend, for saving cookies and authentication
// }))

app.get("/", (req, res) => {
    res.send("Nice")
    // console.log(process.env.FRONTEND_URL);
})


//MIDDLEWARE FOR ERROR
app.use(errorMiddleware);
//error handling, when we will call next with err as parameters, then main logic will stop executing and err middleware will be executed