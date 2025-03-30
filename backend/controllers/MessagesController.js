import Message from "../models/MessagesModel.js";

export const getMessages = async (req, res) => {
    try{
        const recipient = req.userId;
        const sender = req.body.id;

        if(!sender || !recipient){
            return res.status(400).send("Users not found")
        }

        const messages = await Message.find({
            $or: [
                {sender: sender, recipient: recipient},
                {sender: recipient, recipient: sender},
            ]
        }).sort({ timestamp: 1 });

        return res.status(200).json({ messages });

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
}
