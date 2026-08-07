require("dotenv").config();

const { analyzeImage } = require("./services/geminiService");

async function test() {
  const result = await analyzeImage("1785171454699.jpg"); // Replace with your uploaded image filename

  console.log(result);
}

test();