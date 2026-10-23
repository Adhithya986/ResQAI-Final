# 🚨 ResQAI - AI Disaster Response & Emergency Coordination Platform

ResQAI is an emergency response platform designed to connect citizens in distress with administrators and rescue teams quickly and efficiently using Artificial Intelligence, GPS tracking, and real-time Socket.IO communication.

Built for **IdeaVerse 2026**.

---

## 🏗️ Architecture

```
ResQAI/
├── backend/                  # Express + Node.js API with Socket.IO & MongoDB
│   ├── config/database.js    # Mongoose connection with timeout & fallback
│   ├── middleware/upload.js  # Multer disk storage for disaster scene images
│   ├── models/               # MongoDB models (User, SOS)
│   ├── routes/               # API routes (sosRoutes, userRoutes)
│   ├── services/             # Gemini AI multimodal disaster analysis
│   └── server.js             # HTTP server with Socket.IO integration
│
└── frontend/                 # Vite + React 19 SPA
    ├── src/
    │   ├── components/       # Navbar, HomeMap, HomeWeather, ProtectedRoute, WeatherCard
    │   ├── pages/            # Home, Sos, Dashboard, RescueDashboard, Broadcast, Login, Register
    │   └── App.jsx           # Client routes with role-based protection
```

---

## ⚡ Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Runs on `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/resqai
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (`frontend/.env`)
```env
VITE_BACKEND_URL=http://localhost:5000
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

---

## 🌟 Key Features
- **🚨 1-Tap & Voice SOS**: Quick submission of emergency type, voice description, coordinates, and photo.
- **🤖 Multimodal AI Analysis**: Analyzes disaster scene photos using Google Gemini to identify disaster type, severity, detected objects, and recommended actions.
- **🗺️ Real-time Interactive Maps**: OpenStreetMap & Leaflet with live dispatch pins and status badges.
- **🚑 Rescue Teams Dispatch**: Dynamic mission assignment to specialized units (Alpha, Bravo, Charlie, Fire, Medical, Police).
- **🌦️ Hyperlocal Weather & Advisory**: Live temperature, wind, humidity, and safety tips for active rescue operations.
- **📢 Real-time Emergency Broadcast**: Instant disaster alerts broadcasted to all active citizens via WebSockets.
