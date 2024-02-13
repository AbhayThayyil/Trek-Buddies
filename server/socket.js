import { Server } from "socket.io";
import { corsOptions } from "./config/cors/corsOptions.js";

// Function to initialize socket.io

export const initializeSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: corsOptions,
  });

  let users = [];

  // To add individual users
  const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
      users.push({ userId, socketId });
  };
  // To remove a user
  const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
  };
  // To get a single user
  const getUser = (receiverId) => {
    return users.find((user) => user.userId === receiverId);
  };

  //connection
  io.on("connection", (socket) => {
    console.log("A user connected");
    console.log(socket,"=======socket data=========");

    //After every connection take userId and socketId from user
    socket.on("addUser", (userId) => {
      addUser(userId, socket.id);
      io.emit("getUsers", users);
    });

    // Send and receive private msgs
    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const receiver = getUser(receiverId);
      console.log(receiver,"==========receiver data========");
      io.to(receiver.socketId).emit("getMessage", {
        senderId,
        text,
      });
    });

    //Disconnection event
    socket.on("disconnect", () => {
      console.log("A user disconnected");
      removeUser(socket.id);
      io.emit("getUsers", users);
    });
  });
  return io;
};
