# Patient Dashboard

## Overview
The **Patient Dashboard** is a comprehensive health monitoring and communication platform aimed at bridging the gap between patients and healthcare providers. This Next.js powered project integrates real-time communication, AI-driven health insights, and centralized report management to improve healthcare delivery.

---

## Folder Structure
```
patient-dashboard/
├── app/                 # Next.js application
│   ├── package.json     # Dependencies and scripts for the Next.js app
│   ├── public/          # Static files
│   ├── src/             # Source code for pages, components, etc.
│   └── ...              # Other Next.js app files
├── ws/                  # WebSocket server
│   ├── package.json     # Dependencies and scripts for the WebSocket server
│   ├── src/             # Source code for the WebSocket server
│   └── ...              # Other WebSocket server files
└── README.md            # Project documentation
```

---

## Key Features
- **Centralized Health Report Management**: Access and manage health reports, prescriptions, and real-time vitals like SpO2, heart rate, blood pressure, and body temperature.
- **AI-Powered Health Predictions**: Analyze historical data to predict potential health risks and provide personalized recommendations.
- **Real-Time Communication**: Enable direct chat consultations between patients and doctors.
- **Emergency Response**: Real-time alerts and digital prescriptions for critical health scenarios.
- **File Management**: Upload and share medical reports and imaging scans securely.

---

## Technology Stack
- **Frontend**: Next.js, React.js, TailwindCSS
- **Backend**: Node.js, Socket.IO
- **Database**: MongoDB, Mongoose
- **AI/ML Integration**: Python, TensorFlow
- **Additional Libraries**: Axios, React Chart.js, Zod

---

## Getting Started

### Prerequisites
- Node.js (version 18+)
- MongoDB
- A package manager like npm, yarn, pnpm, or bun

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/vaibhavgupta5/Patient_Dashboard.git
   cd Patient_Dashboard
   ```

2. Install dependencies for the Next.js app:
   ```bash
   cd app
   npm install
   ```

3. Install dependencies for the WebSocket server:
   ```bash
   cd ../ws
   npm install
   ```

---

## Running the Project

### Running the Next.js Development Server
1. Navigate to the `app` folder:
   ```bash
   cd app
   ```

2. Start the Next.js development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

---

### Running the WebSocket Server
1. Navigate to the `ws` folder:
   ```bash
   cd ws
   ```

2. Start the WebSocket server in development mode:
   ```bash
   npm run dev
   ```

   Or start in production mode:
   ```bash
   npm start
   ```

3. The WebSocket server will be running and ready to handle real-time data.

---

## Deployment
The easiest way to deploy the **Next.js app** is via [Vercel](https://vercel.com). For the **WebSocket server**, deploy it separately on a Node.js-compatible platform (e.g., AWS, Heroku, or DigitalOcean).

---

## Future Scope
- **Health Gamification**: Introduce rewards for healthy habits.
- **Telemedicine Expansion**: Add advanced video/audio consultation features.
- **Wearable Integration**: Sync data from smartwatches and fitness devices.
- **Enhanced Security**: Ensure compliance with healthcare standards and robust encryption.
