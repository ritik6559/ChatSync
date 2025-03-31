import {createContext, useContext, useEffect, useRef} from "react";
import {useAppStore} from "@/store/index.js";
import {io} from "socket.io-client";
import {HOST} from "@/utils/constants.js";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo, setUserInfo } = useAppStore();

    useEffect(() => {
          if( userInfo ) {
              socket.current = io(HOST, {
                  withCredentials: true,
                  query: {
                      userId: userInfo.id
                  }
              });

              socket.current.on("connect", () => {
                  console.log("Connected!");
              });

              const handleConversation = (message) => {
                  const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();

                  if(
                      selectedChatType !== undefined &&
                      ( selectedChatData._id === message.sender._id ||
                        selectedChatData._id === message.recipient._id )
                  ) {
                      console.log(message);
                      addMessage(message);
                  }
              }

              socket.current?.on("receiveMessage", (message) => handleConversation(message))
              socket.current?.on("sendMessage", (message) => handleConversation(message))

              return () => {
                  socket.current?.disconnect();
              }
          }
    }, [userInfo, setUserInfo]);

    return (
        <SocketContext value={socket.current} >
            {children}
        </SocketContext>
    )
}


