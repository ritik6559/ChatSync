import React, {useEffect} from 'react';
import {useAppStore} from "@/store/index.js";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";
import ContactsContainer from "@/pages/chat/components/contacts-container/ContactsContainer.jsx";
import EmptyChatContainer from "@/pages/chat/components/empty-chat-conatainer/EmptyChatContainer.jsx";
import ChatContainer from "@/pages/chat/components/chat-container/ChatContainer.jsx";

const Chat = () => {

    const { userInfo } = useAppStore();
    const navigate = useNavigate();

    useEffect(() => {
        if(!userInfo.profileSetup){
            toast.error("Please setup profile to continue.")
            navigate("/profile");
        }
    }, [ userInfo, navigate ])



    return (
        <div className="flex h-[100vh] text-white overflow-hidden" >
            <ContactsContainer />
            <EmptyChatContainer />
            <ChatContainer />
        </div>
    );
};

export default Chat;
