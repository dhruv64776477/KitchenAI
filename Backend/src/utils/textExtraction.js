
import { GoogleGenerativeAI } from "@google/generative-ai";

import { GEMINI_API_KEY } from "../constants.js";

const API_KEY = GEMINI_API_KEY
if (!API_KEY) {
  console.error("Error: Missing API key. Set API_KEY in your .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);

export async function runGeminiAI( ReciptText ) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Extract the grocery items and their quantities from the receipt text below. If the quantity is not explicitly mentioned, guess the quantity based on the price, assuming a standard unit price for each item. 

Your task is to output ONLY a structured JSON response in an array with each item having the following properties:
- **name** (product name)
- **quantity** (estimated quantity based on price or explicitly mentioned)

Only include items that are used in the kitchen and can be stored in the fridge. Ignore unrelated items. **DO NOT include any extra text before or after the JSON output.**

### Example Response:
[
  {"name": "Orange Juice", "quantity": 1},
  {"name": "Apples", "quantity": 1}
]

### Receipt Text:${ReciptText}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response ? response.text() : "[]"; // Default empty array if no response

    // **Parse the JSON response correctly**
    const jsonData = JSON.parse(text);
    
    // Output as a proper JavaScript array
   //  console.log(jsonData);
    return jsonData
  } catch (error) {
    console.error("Error generating content:", error.message || error);
  }
}

runGeminiAI;