![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Hosting%20%7C%20Functions-orange?logo=firebase)
![Node](https://img.shields.io/badge/Node.js-20-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-brightgreen)
![Status](https://img.shields.io/badge/Status-Production--Ready-success)

# 🎬 FlixMind — AI-Powered Movie Recommendation App (React + Firebase + Gemini)
🚀 **[View Live App](https://flixmind-auth.web.app)**


## 🔎 Keywords

AI Movie Recommendation App, React Movie App, Firebase Cloud Functions, TMDB API Proxy, Google Gemini AI, Secure API Architecture, Full Stack React Project, Firebase Hosting App, AI Search Interface


## 🚀 Key Features

- 🔍 **AI Movie Recommendations**
  - Uses Google Gemini to generate intelligent movie suggestions based on natural language queries
  - Converts AI output into real TMDB movie data for accurate results

- 🎥 **Real-Time Movie Data**
  - Now Playing movies
  - Popular movies
  - Movie trailers (YouTube-ready metadata)

- 🔐 **Enterprise-Grade API Security**
  - All API keys are fully hidden
  - No secrets exposed in frontend or build output
  - Uses Firebase Cloud Functions as secure API proxies

- 🌐 **Fully Deployed & Scalable**
  - Frontend hosted on Firebase Hosting
  - Backend powered by Firebase Functions (Gen 2)
  - Production-ready CORS handling


## 🏗 System Architecture

```text
┌────────────────────┐
│   React Frontend   │
│  (Firebase Hosting)│
└─────────┬──────────┘
          │ HTTPS
          ▼
┌──────────────────────────┐
│ Firebase Cloud Functions │
│  (Node.js 20, Gen 2)     │
│                          │
│  ┌───────────────────┐  │
│  │ tmdbProxy         │──┼──▶ TMDB API
│  │ (Bearer Token)    │  │
│  └───────────────────┘  │
│                          │
│  ┌───────────────────┐  │
│  │ geminiProxy       │──┼──▶ Google Gemini API
│  │ (API Key)         │  │
│  └───────────────────┘  │
│                          │
│ Secrets via Firebase     │
│ Secret Manager           │
└──────────────────────────┘


### Why this architecture?

- Prevents API key leakage
- Enables centralized error handling
- Allows future caching and rate-limiting
- Matches real-world production patterns

---

## 🛠 Tech Stack

### Frontend
- React 18
- Redux Toolkit
- Custom Hooks architecture
- Tailwind CSS
- Firebase Authentication

### Backend
- Firebase Cloud Functions (Node.js 20, Gen 2)
- Google Gemini API
- TMDB API
- Firebase Secret Manager
- CORS middleware

### Deployment
- Firebase Hosting
- Firebase Functions
- Firebase CLI

---

## 🔑 Security Design

- ❌ No `.env` file in frontend
- ❌ No API keys in source code
- ✅ All secrets stored in Firebase Secret Manager
- ✅ Secrets injected securely at runtime
- ✅ Requests validated and routed via backend

This mirrors how sensitive APIs are handled in professional production environments.

---

## 🔁 API Proxies

### TMDB Proxy

Routes:
- `/tmdbProxy/popular`
- `/tmdbProxy/now-playing`
- `/tmdbProxy/trailer?movieId=ID`
- `/tmdbProxy?q=searchTerm`

### Gemini Proxy

- Accepts user prompt
- Calls Gemini using server-side API key
- Returns parsed, structured output

---

## 🧪 Local Development

```bash
# Frontend
npm install
npm start

# Cloud Functions
cd functions
npm install
firebase emulators:start --only functions

# Build frontend
npm run build

# Deploy everything
firebase deploy