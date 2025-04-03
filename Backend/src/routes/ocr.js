import express from "express";
import multer from "multer";
import Tesseract from "tesseract.js";
import fs from "fs";
import path from "path";
import { preprocessImage } from "../utils/imageProcessing.js";
import { runGeminiAI } from "../utils/textExtraction.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/extract-text", upload.single("receipt"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        const filePath = path.resolve(req.file.path);
        await preprocessImage(filePath);

        const { data } = await Tesseract.recognize(filePath, "eng", {
            oem: 3,
            psm: 6,
        });

        fs.unlinkSync(filePath); // Delete temp file after OCR

        // Run Gemini AI text extraction
        const receiptData = await runGeminiAI(data.text); //  Fix variable name typo

        console.log(receiptData);
        res.status(200).json({
            success: true,
            extractedText: data.text,
            receiptData: receiptData || [],
            message: "Data received"
        });
        
    } catch (error) {
        console.error("OCR Error:", error);
        res.status(500).json({ success: false, message: "OCR processing failed" });
    }
});

export default router;
