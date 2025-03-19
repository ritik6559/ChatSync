import { Router } from "express";
import {signUp, login, getUserInfo, updateProfile} from "../controllers/AuthController.js";
import {verifyToken} from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.get("/user-info", verifyToken, getUserInfo);


export default authRoutes;