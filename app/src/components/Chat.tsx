'use client';

import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

const initializeSocket = () => {
  if (!socket) {
    socket = io("http://localhost:8000");
  }
  return socket;
};

interface Message {
  id: number;
  name: string;
  message: string;
}

interface ChatProps {
  room: string;
}

const Chat: React.FC<ChatProps> = ({ room }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socket = initializeSocket();

    if (room) {
      socket.emit("join-room", room);

      const handleInitialMessages = (msgs: Message[]) => {
        console.log("Initial Messages:", msgs);
        setMessages(msgs);
      };

      const handleNewMessage = (msg: Message) => {
        console.log("New Message:", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      };

      // Set up event listeners
      socket.on("initial-messages", handleInitialMessages);
      socket.on("chat message", handleNewMessage);

      // Clean up listeners on component unmount or room change
      return () => {
        socket.off("initial-messages", handleInitialMessages);
        socket.off("chat message", handleNewMessage);
      };
    }
  }, [room]);

  const sendMessage = () => {
    if (message.trim() && room) {
      const socket = initializeSocket();
      const msg: Message = {
        id: Date.now(),
        name: "Patient",
        message,
      };

      socket.emit("chat message", { room, msg });
      setMessage("");
    }
  };

  return (
    <div className="flex text-black flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h2 className="text-lg font-bold">Chat Room: {room || "Loading..."}</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.name === "Patient" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-md ${
                  msg.name === "Patient"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                <p className="text-sm font-bold">{msg.name}:</p>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center border-t border-gray-300 p-4 bg-white">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          className="ml-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
