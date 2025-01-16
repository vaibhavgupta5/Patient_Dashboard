import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Store chat messages for each room
interface ChatMessage {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

interface ChatRooms {
  [room: string]: ChatMessage[];
}

interface ActiveRooms {
  [room: string]: string[];
}

let chatRooms: ChatRooms = {}; // { room: [{ id, name, message, timestamp }] }

// Store active users in rooms
let activeRooms: ActiveRooms = {}; // { room: [socket.id, ...] }

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a specific room
  socket.on("join-room", (room) => {
    socket.join(room);

    // Add the socket to the active room list
    if (!activeRooms[room]) {
      activeRooms[room] = [];
    }
    activeRooms[room].push(socket.id);

    console.log(`User ${socket.id} joined room: ${room}`);

    // Send initial chat messages for the room
    if (!chatRooms[room]) {
      chatRooms[room] = [
        {
          id: 1,
          name: "System",
          message: `Welcome to room ${room}!`,
          timestamp: new Date().toISOString(),
        },
      ];
    }
    socket.emit("initial-message", chatRooms[room]);

    // Notify all users about active rooms
    emitActiveRooms();
  });

  // Handle incoming chat messages
  socket.on("chat message", ({ room, msg }) => {
    if (!chatRooms[room]) {
      chatRooms[room] = [];
    }

    // Add a timestamp to the message
    const message = {
      id: Date.now(),
      ...msg,
      timestamp: new Date().toISOString(),
    };

    chatRooms[room].push(message);
    console.log(`Room ${room} - New message: ${msg.message}`);

    // Broadcast the message to users in the room
    io.to(room).emit("chat message", message);

    // Notify other users in different rooms about new messages
    emitActiveRooms();
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);

    // Remove the user from active rooms
    for (const room in activeRooms) {
      activeRooms[room] = activeRooms[room].filter((id) => id !== socket.id);

      // Remove the room if it's empty
      if (activeRooms[room].length === 0) {
        delete activeRooms[room];
        delete chatRooms[room];
      }
    }

    // Notify all users about updated active rooms
    emitActiveRooms();
  });

  // Emit the list of active rooms
  const emitActiveRooms = () => {
    const rooms = Object.keys(activeRooms).map((room) => ({
      room,
      users: activeRooms[room].length,
      hasNewMessages: chatRooms[room] ? chatRooms[room].length > 1 : false, // Check for new messages
    }));
    io.emit("active-rooms", rooms);
  };
});

const PORT = 8000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
