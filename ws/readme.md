# Patient Dashboard - WebSocket Server (`ws`)

## Overview
The **Patient Dashboard WebSocket Server** provides real-time communication capabilities for the platform. It handles live updates of patient vitals, real-time doctor-patient chats, and emergency alerts to ensure seamless data transfer and interaction.

---

## Key Features
- **Real-Time Updates**: Enables live updates for patient vitals and health monitoring.
- **Chat Functionality**: Powers real-time doctor-patient messaging.
- **Emergency Alerts**: Facilitates immediate notifications for critical health situations.

---

## Technology Stack
- **Backend**: Node.js
- **WebSocket Framework**: Socket.IO
  
---

## Getting Started

### Prerequisites
- Node.js (version 18+)

### Installation
1. Navigate to the `ws` folder:
   ```bash
   cd ws
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the WebSocket Server

### Development Mode
Start the server in development mode with live reloading:
```bash
npm run dev
```

### Production Mode
Build and start the server in production:
```bash
npm start
```

---

## Deployment
Deploy the WebSocket server on a Node.js-compatible platform such as:
- **AWS**
- **Heroku**
- **DigitalOcean**

Ensure the environment variables in the `.env` file are properly configured for production.

---

## Future Scope
- **Scalability**: Optimize the WebSocket server for handling large-scale concurrent connections.
- **Enhanced Security**: Add end-to-end encryption for real-time communication.
- **Health Device Integration**: Extend compatibility with IoT and wearable devices.
