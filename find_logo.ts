import { GoogleGenAI } from "@google/genai";

async function findGrokLogo() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Find the official SVG path for the xAI Grok logo. It is a stylized slash with two curved brackets. Provide the SVG path data in a format I can use in a React component.",
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  console.log(response.text);
}

findGrokLogo();
