require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");

function getAIClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
}

async function analyzeImage(filename) {
  try {
    const imagePath = path.join(__dirname, "..", "uploads", filename);

    if (!fs.existsSync(imagePath)) {
      console.warn("⚠️ Image file not found for analysis:", imagePath);
      return "Image file not found on server.";
    }

    const ai = getAIClient();
    if (!ai) {
      console.warn("⚠️ GEMINI_API_KEY is not set.");
      return "AI analysis unavailable: Missing GEMINI_API_KEY.";
    }

    const imageBytes = fs.readFileSync(imagePath);
    const imageBase64 = imageBytes.toString("base64");

    // Detect mime type from file extension
    const ext = path.extname(filename).toLowerCase();
    const mimeType =
      ext === ".png"
        ? "image/png"
        : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI Disaster Response Assistant.

Analyze this disaster image and return ONLY in this format:

Disaster Type:
Severity:
Confidence:
Detected Objects:
Recommended Action:`,
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: imageBase64,
              },
            },
          ],
        },
      ],
    });

    return (
      response?.text ||
      "AI analysis completed, but no text response was returned."
    );
  } catch (error) {
    console.error("Gemini Error:", error.message || error);
    // Try fallback model if model not found
    try {
      const ai = getAIClient();
      const imagePath = path.join(__dirname, "..", "uploads", filename);
      const imageBytes = fs.readFileSync(imagePath);
      const imageBase64 = imageBytes.toString("base64");

      const fallbackResponse = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: "Analyze this disaster emergency image. State: Disaster Type, Severity (Low/Medium/High/Critical), and Recommended Action.",
              },
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: imageBase64,
                },
              },
            ],
          },
        ],
      });
      return fallbackResponse?.text || "Disaster image processed.";
    } catch (fallbackError) {
      console.error("Gemini Fallback Error:", fallbackError.message);
      return "Disaster image received. Automated AI analysis temporarily unavailable.";
    }
  }
}

module.exports = {
  analyzeImage,
};