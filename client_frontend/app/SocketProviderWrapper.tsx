"use client";

import React, { useEffect, useState, createContext } from "react";
import io, { Socket } from "socket.io-client";

export const SocketContext = createContext<typeof Socket | null>(null);

export const SocketProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    const newSocket = io("https://calendar-mv5n.onrender.com/graphql");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
