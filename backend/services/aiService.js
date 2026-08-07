console.log("✅ aiService.js loaded");
const { InferenceClient } = require("@huggingface/inference");
const fs = require("fs");
const path = require("path");

const client = new InferenceClient(process.env.HF_TOKEN);

async function analyzeImage(filename) {
  try {
    const imagePath = path.join(__dirname, "..", "uploads", filename);

    const imageBuffer = fs.readFileSync(imagePath);

    const result = await client.imageClassification({
      model: "google/vit-base-patch16-224",
      data: imageBuffer,
    });

    return result;
  } catch (error) {
    console.error("AI Error:", error);
    return null;
  }
}

module.exports = {
  analyzeImage,

};

console.log("✅ Exporting:", module.exports);