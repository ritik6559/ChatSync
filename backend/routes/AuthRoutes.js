import { Router } from "express";
import {
    signUp,
    login,
    getUserInfo,
    updateProfile,
    updateProfileImage,
    deleteProfileImage, logout
} from "../controllers/AuthController.js";
import {verifyToken} from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" });

authRoutes.post("/signup", signUp);
authRoutes.post("/login", login);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post("/logout", logout);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post(
    "/add-profile-image",
    verifyToken,
    upload.single("profile-image"),
    updateProfileImage
);
authRoutes.delete("/remove-profile-image", verifyToken, deleteProfileImage);


export default authRoutes;
