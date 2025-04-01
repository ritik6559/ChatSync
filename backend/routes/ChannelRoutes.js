import express from "express";
import {verifyToken} from "../middlewares/AuthMiddleware.js";
import {createChannel} from "../controllers/ChannelController.js";

const channelRouter = express.Router();

channelRouter.post("/create-channel", verifyToken, createChannel);

export default channelRouter;
