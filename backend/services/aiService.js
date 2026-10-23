require("dotenv").config();
const fs = require("fs");
const path = require("path");
const geminiService = require("./geminiService");

let client = null;
try {
  const { InferenceClient } = require("@huggingface/inference");
  if (process.env.HF_TOKEN) {
    client = new InferenceClient(process.env.HF_TOKEN);
  }
} catch {
  // @huggingface/inference optional
}

async function analyzeImage(filename) {
  try {
    if (client) {
      const imagePath = path.join(__dirname, "..", "uploads", filename);
      if (fs.existsSync(imagePath)) {
        const imageBuffer = fs.readFileSync(imagePath);
        const result = await client.imageClassification({
          model: "google/vit-base-patch16-224",
          data: imageBuffer,
        });
        return result;
      }
    }

    // Default to Gemini analysis
    return await geminiService.analyzeImage(filename);
  } catch (error) {
    console.error("AI Error:", error.message || error);
    return null;
  }
}

module.exports = {
  analyzeImage,
};