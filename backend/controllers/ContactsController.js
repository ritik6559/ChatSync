import User from "../models/UserModel.js";
import mongoose from "mongoose";

export const searchContacts = async (req, res) => {
    try{
        const { searchTerm } = req.body;

        if(searchTerm === undefined){
            return res.status(400).send("Search term is required");
        }

        const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^${}()|[\]\\]/g,
            "\\$&"
        );

        const regex = new RegExp(sanitizedSearchTerm, "i");
        const contacts = await User.find({
            $and: [
                {
                    _id: { $ne: req.userId}
                },
                {
                    $or: [{firstName: regex}, {lastName: regex}, {email: regex}],
                }
            ]
        });

        return res.status(200).json({ contacts });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}


export const getContactsForDMList = async (req, res) => {
    try{

        let userId = req.userId;

        userId = new mongoose.Types.ObjectId(userId);

        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [
                        {sender: userId}, {recipient: userId}
                    ]
                }
            }
        ])


    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}
