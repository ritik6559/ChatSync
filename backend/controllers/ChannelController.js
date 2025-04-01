import User from "../models/UserModel.js";
import Channel from "../models/ChannelModel.js";
import mongoose from "mongoose";

export const createChannel = async (req, res) => {
    try{
        const { name, members } = req.body;

        const userId = req.userId;

        const admin = await User.findById(userId);

        if(!admin){
            console.log("User does not exist");
            return res.status(400).send("Admin user not found");
        }

        const validMembers = await User.find({
            _id: {
                $in: members
            }
        });

        if( validMembers.length !== members.length ){
            console.log(validMembers);
            return res.status(400).send("Some members are not valid users");
        }

        const newChannel = new Channel({
            name,
            members,
            admin: userId,
        });

        await newChannel.save();
0
        return res.status(201).json({
            channel: newChannel,
        });
    } catch(error){
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}

export const gertUserChannels = async (req, res) => {
    try{
        const userId =  new mongoose.Types.ObjectId(req.userId);

        const channels = await Channel.find({
            $or: [
                { admin: userId },
                {members: userId}
            ]
        });

        return res.status(200).json({
            channels: channels
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
}
