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
    contents: "Provide the precise SVG path data for the official xAI Grok logo. It is a stylized X. Describe the paths clearly so I can replicate it. Return ONLY the SVG code.",
  });
  console.log(response.text);
}

findGrokLogo();
