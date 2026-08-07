require("dotenv").config();

const { analyzeImage } = require("./services/aiService");

async function test() {
  console.log("🚀 Testing AI...");

  const result = await analyzeImage("1785163100189.jpg");

  console.log("✅ AI Result:");
  console.log(result);
}

test().catch(console.error);