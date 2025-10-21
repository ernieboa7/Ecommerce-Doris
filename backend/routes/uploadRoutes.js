// backend/routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { isAuth, isAdmin } from "../util.js";

dotenv.config();

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer temp storage
const upload = multer({ dest: "uploads/" });

// POST /api/upload
router.post("/", isAuth, isAdmin, upload.single("image"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce",
      use_filename: true,
      unique_filename: true,
    });

    fs.unlinkSync(req.file.path); // cleanup temp file
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
    res.status(500).json({ message: "Image upload failed", error: error.message });
  }
});

export default router;
