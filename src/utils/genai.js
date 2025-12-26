import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.REACT_APP_GEMINI_API_KEY,
});

export default client;