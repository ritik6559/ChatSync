import React from 'react';
import ChatHeader from "@/pages/chat/components/chat-container/components/chat-header/ChatHeader.jsx";
import MessageBar from "@/pages/chat/components/chat-container/components/message-bar/MessageBar.jsx";
import MessageContainer from "@/pages/chat/components/chat-container/components/message-container/MessageContainer.jsx";

const ChatContainer = () => {
    return (
        <div className={"fixed top-0 h-[100vh] w-[100vw]  bg-[#1c1d25] flex flex-col md:static md:flex-1"} >
            <ChatHeader />
            <MessageContainer />
            <MessageBar />
        </div>
    );
};

export default ChatContainer;
