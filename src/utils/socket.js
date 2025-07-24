import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "../config";

let socket;
let isConnected = false;

export const connectSocket = () => {
  console.log("Connecting to socket... on ", SOCKET_BASE_URL);
  return new Promise((resolve, reject) => {
    socket = io(SOCKET_BASE_URL);

    socket.on("connect", () => {
      console.log("Connected");
      isConnected = true;
      resolve(socket); // Resolve the promise when connected
    });

    socket?.on("connectionSuccess", (data) => {
      console.log(data);
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      reject(error); // Reject the promise if there is a connection error
    });

    socket.on("disconnect", () => {
      console.log("Disconnected");
      isConnected = false;
    });
  });
};

export const getSocketConnectionStatus = () => {
  return isConnected;
};

export const getSocket = () => {
  return socket;
};
