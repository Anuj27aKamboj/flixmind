# 🎬 FlixMind — AI-Powered Movie Discovery App

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange?logo=firebase)
![Vercel](https://img.shields.io/badge/Vercel-Serverless-black?logo=vercel)
![License](https://img.shields.io/badge/License-MIT-brightgreen)
![Status](https://img.shields.io/badge/Status-Production--Ready-success)

🚀 **[View Live App](https://flixmind-auth.web.app)** · **[API Repo](https://github.com/Anuj27aKamboj/flixmind-api)**

---

## What it does

FlixMind lets users discover movies through natural language. Type "something like Interstellar but darker" and Gemini AI interprets the query, generates movie suggestions, and fetches real TMDB data for each result — posters, ratings, trailers included.

---

## Features

- **AI Movie Search** — Natural language queries processed by Google Gemini, results resolved against TMDB
- **Now Playing & Popular** — Live movie data from TMDB
- **Trailer Playback** — YouTube-ready trailer metadata per movie
- **Firebase Auth** — Email/password authentication with protected routes
- **Multi-language UI** — Language selector with i18n support

---

## Architecture

```
┌────────────────────────┐
│    React Frontend      │
│   (Firebase Hosting)   │
└───────────┬────────────┘
            │ HTTPS
            ▼
┌────────────────────────┐
│   Vercel Serverless    │
│    (flixmind-api)      │
│                        │
│  /api/popular      ────┼──▶ TMDB API
│  /api/now-playing  ────┼──▶ TMDB API
│  /api/trailer      ────┼──▶ TMDB API
│  /api/search       ────┼──▶ TMDB API
│  /api/gemini       ────┼──▶ Google Gemini API
│                        │
│  Secrets via Vercel    │
│  Environment Variables │
└────────────────────────┘
```

The React frontend never touches TMDB or Gemini directly. All external API calls are proxied through Vercel serverless functions, keeping both the TMDB Bearer token and Gemini API key fully server-side.

---

## Tech Stack

**Frontend**
- React 18, Redux Toolkit
- Tailwind CSS
- Firebase Authentication
- Custom hooks for data fetching

**Backend** — [`flixmind-api`](https://github.com/Anuj27aKamboj/flixmind-api)
- Vercel Serverless Functions (Node.js 18)
- Google Gemini API (`gemini-2.5-flash`)
- TMDB API (Bearer token auth)

**Deployment**
- Firebase Hosting (frontend)
- Vercel (API layer)

---

## API Routes

All routes live at `https://flixmind-api.vercel.app/api`

| Route | Method | Description |
|---|---|---|
| `/popular` | GET | Popular movies from TMDB |
| `/now-playing` | GET | Currently in theatres |
| `/trailer?movieId=ID` | GET | Trailer metadata for a movie |
| `/search?q=term` | GET | Search TMDB by title |
| `/gemini` | POST | Natural language → movie list via Gemini |

---

## Security

- TMDB Bearer token stored in Vercel environment variables — never in the bundle
- Gemini API key stored in Vercel environment variables — never in the bundle
- `.env` excluded from version control via `.gitignore`
- Firebase API key restricted by HTTP referrer in Google Cloud Console

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm start
```

Create a `.env` file in the project root — this is only needed if running the Gemini proxy locally. For local development, the app points to the deployed Vercel API by default via `TMDB_API_FUNCTION` in `constants.js`.

```bash
# Production build
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

For the API layer, see the [flixmind-api repo](https://github.com/Anuj27aKamboj/flixmind-api).
firebase deploy
