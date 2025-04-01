import express from "express";
import {verifyToken} from "../middlewares/AuthMiddleware.js";
import {createChannel, gertUserChannels} from "../controllers/ChannelController.js";

const channelRouter = express.Router();

channelRouter.post("/create-channel", verifyToken, createChannel);
channelRouter.get("/get-user-channels", verifyToken, gertUserChannels);

export default channelRouter;
