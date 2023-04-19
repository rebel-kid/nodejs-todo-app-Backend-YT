import express from "express";
import { User } from "../models/user.js";
import { deleteUser, getAllUsers, getUserByID, registerUser, specialFunction, updateUser } from "../controllers/user.js";

const router = express.Router();

//GET
router.get("/all", getAllUsers);
//POST- Register user
router.post("/new", registerUser);
//special URLs - add firstly these, add dynamic routes in the last, so that when executing special routes will be executed first, if not, then dynamic route will be executed always, if you place special routes last, it'll give error
router.get("/userid/special", specialFunction)

//Dynamic Routing -> /userid -> static URL -> :id-> dynamic URL

router.route("/userid/:id").get(getUserByID).put(updateUser).delete(deleteUser);
// router.get("/userid/:id", getUserByID);
// router.put("/userid/:id", updateUser);
// router.delete("/userid/:id", deleteUser);

export default router;