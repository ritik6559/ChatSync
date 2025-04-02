import express from "express";
import {verifyToken} from "../middlewares/AuthMiddleware.js";
import {createChannel, gertUserChannels, getChannelMessages} from "../controllers/ChannelController.js";

const channelRouter = express.Router();

channelRouter.post("/create-channel", verifyToken, createChannel);
channelRouter.get("/get-user-channels", verifyToken, gertUserChannels);
channelRouter.get("/get-channel-messages/:channelId", verifyToken, getChannelMessages);

export default channelRouter;
