import Jimp from "jimp";
import fs from "fs";
import path from "path";

export async function preprocessImage(imagePath) {
   try {
       const image = await Jimp.read(imagePath);
       await image
           .resize(1000, Jimp.AUTO) // ✅ Keep text readable
           .greyscale() // ✅ Convert to grayscale (better for OCR)
           .normalize() // ✅ Normalize contrast slightly
           .quality(100) // ✅ Keep image quality high
           .writeAsync(imagePath); // ✅ Save processed image
   } catch (error) {
       console.error(" Preprocessing Error:", error);
       throw new Error("Image preprocessing failed");
   }
 }