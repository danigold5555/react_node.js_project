import React, { useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = React.createContext(io());
export const ConnectContext = React.createContext<Function>(Function);

export default function SocketContainer({ children }: any) {
    let [socket, setSocket] = useState(io("",{}));
    let connect: Function = (token: string) => {
        let newSocket = io("http://localhost:3002", {
            query: { token }
        });
        setSocket(newSocket);
        console.log("Successful websocket connection");
    }

    
    return (
        <SocketContext.Provider value={socket}>
            <ConnectContext.Provider value={connect}>
                {children}
            </ConnectContext.Provider>
        </SocketContext.Provider>
    );
}