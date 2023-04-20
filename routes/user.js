import express from "express";
import { User } from "../models/user.js";
import { getAllUsers, getUserByID, registerUser, loginUser} from "../controllers/user.js";

const router = express.Router();

//GET
router.get("/all", getAllUsers);
//POST- Register user
router.post("/new", registerUser);
//create route for login
router.post("/login", loginUser)

//Dynamic Routing -> /userid -> static URL -> :id-> dynamic URL

router.route("/userid/:id").get(getUserByID);
// .put(updateUser).delete(deleteUser) - keeping basic functinality, register and create task for now


export default router;