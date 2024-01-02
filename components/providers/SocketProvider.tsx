"use client";

import { useSocket } from "@/hooks/use-socket";
import { useEffect } from "react";
import { io } from "socket.io-client";

export const InitSocket = () => {
  const { socket, setSocket } = useSocket();

  useEffect(() => {
    if (!socket) {
      const newSocket = io("http://localhost:5000");
      setSocket(newSocket);
    }
  }, []);

  return null;
};
