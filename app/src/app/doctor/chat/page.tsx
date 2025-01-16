'use client';

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

const DoctorChat = () => {
  const [rooms, setRooms] = useState<any[]>([]); // List of active rooms
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null); // Currently selected room
  const [message, setMessage] = useState(""); // Message input
  const [messages, setMessages] = useState<any[]>([]); // Messages in the selected room

  // Fetch active rooms on initial load
  useEffect(() => {
    socket.on("active-rooms", (rooms) => {
      setRooms(rooms);
    });

    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Join a room and fetch messages
  const joinRoom = (room: string) => {
    setSelectedRoom(room);
    socket.emit("join-room", room);
    socket.on("initial-message", (msgs) => {
      setMessages(msgs);
    });
  };

  // Send a message
  const sendMessage = () => {
    if (message.trim() && selectedRoom) {
      const msg = {
        name: "Doctor", // Replace with actual doctor name if available
        message,
      };

      socket.emit("chat message", { room: selectedRoom, msg });
      setMessage("");
    }
  };

  return (
    <div className="flex text-black h-screen">
      {/* Sidebar for Active Rooms */}
      <div className="w-1/4 bg-gray-100 border-r">
        <h2 className="text-lg font-bold p-4 border-b">Active Rooms</h2>
        <ul>
          {rooms.map((room) => (
            <li
              key={room.room}
              className={`p-4 font-bold border-b cursor-pointer ${
                selectedRoom === room.room ? "bg-blue-100" : ""
              }`}
              onClick={() => joinRoom(room.room)}
            >
              <div className="flex justify-between">
                <span>{room.room}</span>
                {room.hasNewMessages && <span className="text-green-500">New</span>}
              </div>
              <small className="text-gray-500">{room.users} users</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 bg-white flex flex-col">
        {selectedRoom ? (
          <>
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold">Room: {selectedRoom}</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((msg, index) => (
                <div key={index} className="mb-2">
                  <strong>{msg.name}: </strong>
                  <span>{msg.message}</span>
                  <div className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t flex">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-md"
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-gray-500">Select a room to start chatting</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorChat;
