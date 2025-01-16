'use client';
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const Chat = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ id: number; name: string; message: string }[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("patientData");
    const roomNumber = storedData ? JSON.parse(storedData)?.room_number : null;

    if (roomNumber) {
      setRoom(roomNumber);
      socket.emit("join-room", roomNumber);

      // Listen for initial messages
      socket.on("initial-message", (msgs) => {
        setMessages(msgs);
      });

      // Listen for new chat messages
      socket.on("chat message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const msg = {
        id: Date.now(),
        name: "Patient", // Replace with actual user name if available
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
                  msg.name === "Patient" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
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
