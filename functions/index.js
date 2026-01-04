import {onRequest} from "firebase-functions/v2/https";
import fetch from "node-fetch";
import {GoogleGenerativeAI} from "@google/generative-ai";
import cors from "cors";
import {defineSecret} from "firebase-functions/params";

/**
 * TMDB PROXY
 */
const TMDB_TOKEN = defineSecret("TMDB_TOKEN");
const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");

// For TMDB (GET only)
const tmdbCors = cors({
  origin: true,
  methods: ["GET"],
});

// For Gemini (POST only)
const geminiCors = cors({
  origin: true,
  methods: ["POST"],
});

export const tmdbProxy = onRequest({secrets: [TMDB_TOKEN]}, (req, res) => {
  tmdbCors(req, res, async () => {
    try {
      const path = req.path;
      const query = req.query.q;
      const movieId = req.query.movieId;

      let tmdbUrl = "";

      // 🔍 SEARCH (Gemini → TMDB)
      if (query) {
        tmdbUrl = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
            query,
        )}&language=en-US&page=1`;
      } else if (path === "/popular") { // 🔥 POPULAR
        tmdbUrl =
          "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
      } else if (path === "/now-playing") { // 🎬 NOW PLAYING
        tmdbUrl =
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
      } else if (path === "/trailer") { // ▶️ TRAILER
        if (!movieId) {
          return res
              .status(400)
              .json({error: "movieId query param required"});
        }
        tmdbUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
      } else { // UNKNOWN ROUTE
        return res.status(404).json({error: "Invalid TMDB route"});
      }

      const response = await fetch(tmdbUrl, {
        headers: {
          Authorization: `Bearer ${TMDB_TOKEN.value()}`,
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`TMDB responded with ${response.status}`);
      }

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("TMDB proxy error:", error);
      res.status(500).json({error: "TMDB proxy failed"});
    }
  });
});

/**
 * GEMINI PROXY
 */

// ===============================
// GEMINI PROXY
// ===============================
export const geminiProxy = onRequest(
    {
      region: "us-central1",
      secrets: [GEMINI_API_KEY],
    },
    async (req, res) => {
      geminiCors(req, res, async () => {
        try {
          if (req.method !== "POST") {
            return res.status(405).json({error: "Method not allowed"});
          }

          const {prompt} = req.body;

          if (!prompt) {
            return res.status(400).json({error: "Prompt missing"});
          }

          const genAI = new GoogleGenerativeAI(GEMINI_API_KEY.value());
          const model = genAI.getGenerativeModel({
            model: "models/gemini-2.5-pro",
          });

          const result = await model.generateContent(prompt);
          const text = result.response.text();

          return res.status(200).json({text});
        } catch (err) {
          console.error("Gemini error:", err);
          return res.status(500).json({error: "Gemini proxy failed"});
        }
      });
    },
);
