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
    const { userInfo } = useAppStore();

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

              const handleReceiveMessage = (message) => {
                  const { selectedChatData, selectedChatType } = useAppStore.getState();

                  if(
                      selectedChatType !== undefined &&
                      ( selectedChatData._id === message.sender._id ||
                        selectedChatData._id === message.recipient._id )
                  ) {

                  }
              }
          }

          return () => {
              socket.current?.disconnect();
          }
    }, [userInfo]);

    return (
        <SocketContext value={socket.current} >
            {children}
        </SocketContext>
    )
}


