import { GoogleGenAI } from "@google/genai";

async function findGrokLogo() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || "";
  if (!apiKey) {
    console.log("No API key found in environment");
    return;
  }
  const ai = new GoogleGenAI({ apiKey });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Provide the official SVG path for the xAI Grok logo. It is a stylized 'X' or 'slash' design. Please provide the exact SVG code or path data that is considered the official brand logo for Grok by xAI. I need it for a React component.",
    config: {
      tools: [{ googleSearch: {} }]
    }
  });
  console.log(response.text);
}

findGrokLogo();
