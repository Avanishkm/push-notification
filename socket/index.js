import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};


io.on("connection", (socket) => {
    socket.on("newUser", (username) => {
      addNewUser(username, socket.id);
    });

    socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver?.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

    socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });
    
  
  socket.on("disconnect", () => {
    removeUser(socket.id);
  })
});

io.listen(5000)



// let onlineUsers = [];

// const addNewUser = (username, socketId) => {
//   !onlineUsers.some((user) => user.username === username) &&
//     onlineUsers.push({ username, socketId });
// };

// const removeUser = (socketId) => {
//   onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
// };

// const getUser = (username) => {
//   return onlineUsers.find((user) => user.username === username);
// };

// io.on("connection", (socket) => {
//   socket.on("newUser", (username) => {
//     addNewUser(username, socket.id);
//   });

  // socket.on("sendNotification", ({ senderName, receiverName, type }) => {
  //   const receiver = getUser(receiverName);
  //   io.to(receiver.socketId).emit("getNotification", {
  //     senderName,
  //     type,
  //   });
  // });

//   socket.on("sendText", ({ senderName, receiverName, text }) => {
//     const receiver = getUser(receiverName);
//     io.to(receiver.socketId).emit("getText", {
//       senderName,
//       text,
//     });
//   });

//   socket.on("disconnect", () => {
//     removeUser(socket.id);
//   });
// });

// io.listen(5000);


// import { Server } from "socket.io";

// const io = new Server({
//   cors: {
//     origin: "http://localhost:3001",
//   },
// });

// const onlineUsers = new Map();

// const addUser = (username, socket) => {
//   onlineUsers.set(username, socket);
// };

// const removeUser = (username) => {
//   onlineUsers.delete(username);
// };

// io.on("connection", (socket) => {
//   socket.on("newUser", (username) => {
//     addUser(username, socket);
//     socket.join(username); // Join a room with the username
//   });

//   socket.on("sendNotification", ({ senderName, receiverName, type }) => {
//     const receiverSocket = onlineUsers.get(receiverName);
//     if (receiverSocket) {
//       receiverSocket.emit("getNotification", { senderName, type });
//     } else {
//       // Handle the case when the receiver is not online
//     }
//   });

//   socket.on("sendText", ({ senderName, receiverName, text }) => {
//     const receiverSocket = onlineUsers.get(receiverName);
//     if (receiverSocket) {
//       receiverSocket.emit("getText", { senderName, text });
//     } else {
//       // Handle the case when the receiver is not online
//     }
//   });

//   socket.on("disconnect", () => {
//     // Find and remove disconnected user from onlineUsers Map
//     for (const [username, userSocket] of onlineUsers.entries()) {
//       if (userSocket === socket) {
//         removeUser(username);
//         break;
//       }
//     }
//   });
// });

// io.listen(5000);

