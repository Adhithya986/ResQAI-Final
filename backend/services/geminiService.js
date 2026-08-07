const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const path = require("path");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function analyzeImage(filename) {
  try {
    const imagePath = path.join(__dirname, "..", "uploads", filename);

    const imageBytes = fs.readFileSync(imagePath);
    const imageBase64 = imageBytes.toString("base64");

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
Recommended Action:`
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

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Unable to analyze image.";
  }
}

module.exports = {
  analyzeImage,
};