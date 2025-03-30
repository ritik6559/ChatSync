import React, {useEffect, useRef, useState} from 'react';
import {GrAttachment} from "react-icons/gr";
import {RiEmojiStickerLine} from "react-icons/ri";
import {IoSend} from "react-icons/io5";
import EmojiPicker from "emoji-picker-react";
import {useAppStore} from "@/store/index.js";
import {useSocket} from "@/context/SocketContext.jsx";

const MessageBar = () => {

    const [message, setMessage] = useState('');
    const emojiRef = useRef();
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
    const { selectedChatType, selectedChatData, userInfo, addMessage } = useAppStore();
    const socket = useSocket();

    useEffect(() => {
        function handleClickOutside(event){
            if( emojiRef.current && !emojiRef.current.contains(event.target) ){
                setEmojiPickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [emojiRef]);

    const handleAddEmoji = (emoji) => {
        setMessage((msg) => msg + emoji.emoji);
    }


    const sendMessage = () => {
        try {

            if (selectedChatType === "contact") {
                socket.emit("sendMessage", {
                    sender: userInfo.id,
                    content: message,
                    recipient: selectedChatData._id,
                    messageType: "text",
                    fileUrl: undefined
                });

            }

            setMessage('');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6" >
            <div className="flex-1 flex bg-[#2a2b33] rounded-md  items-center pr-5 gap-5" >
                <input
                    type={"text"}
                    className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline"
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className="text-neutral-500 focus:border-none focus:outline-none hover:text-white focus:text-white duration-500 transition-all" >
                    <GrAttachment className="text-2xl" />
                </button>
                 <div>
                     <button
                         className="text-neutral-500 focus:border-none focus:outline-none hover:text-white focus:text-white duration-500 transition-all"
                         onClick={() => setEmojiPickerOpen(true)}
                     >
                         <RiEmojiStickerLine className="text-2xl" />
                     </button>
                     <div
                         className={"absolute bottom-16 right-0"}
                         ref={emojiRef}
                     >
                         <EmojiPicker
                             theme={"dark"}
                             open={emojiPickerOpen}
                             onEmojiClick={handleAddEmoji}
                             autoFocusSearch={false}
                         />
                     </div>
                 </div>
            </div>

            <button
                className="bg-[#8417ff] rounded-md flex justify-center items-center p-5 hover:bg-[#741bda] focus:bg-[#741bda] focus:border-none focus:outline-none hover:text-white focus:text-white duration-500 transition-all"
                onClick={sendMessage}
            >
                <IoSend className="text-2xl" />
            </button>


        </div>
    );
};

export default MessageBar;
