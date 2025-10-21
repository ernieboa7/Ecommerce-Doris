// backend/routes/uploadRoutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { isAuth, isAdmin } from "../util.js"; //  secure upload route

dotenv.config();

const router = express.Router();

//  Configure Cloudinary from environment
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  Multer setup: temporary file storage
const upload = multer({ dest: "uploads/" });

// POST /api/upload — upload image (auth + admin protected)
router.post("/", isAuth, isAdmin, upload.single("image"), async (req, res) => {
  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ecommerce",
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    // Delete temp file from Render container
    fs.unlinkSync(req.file.path);

    // Respond with Cloudinary URL
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary Upload Error:", err.message);
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
});

export default router;
