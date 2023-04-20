import express from "express";
import { User } from "../models/user.js";
import { getMyDetails, registerUser, loginUser, logoutUser} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//GET
// router.get("/all", getAllUsers);
//POST- Register user
router.post("/new", registerUser);
//create route for login
router.post("/login", loginUser);
//logout
router.get("/logout",isAuthenticated, logoutUser);


//Dynamic Routing -> /userid -> static URL -> :id-> dynamic URL

router.get("/me", isAuthenticated, getMyDetails);
// .put(updateUser).delete(deleteUser) - keeping basic functinality, register and create task for now


export default router;