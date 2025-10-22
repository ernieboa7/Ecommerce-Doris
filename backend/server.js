import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";

// === Local imports ===
import config from "./config.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import uploadRoutes from "./routes/uploadRoutes.js"; //  ensure name matches actual file (plural)

// === Paths ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



// === Init Express ===
const app = express();

// === Middleware ===
app.use(bodyParser.json());

import cors from "cors";

const allowedOrigins = [
  "https://ecommerce-doris-1.onrender.com",
  "https://ecommerce-doris.onrender.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS blocked for this origin"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// === MongoDB Connection ===
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas successfully"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// === Serve Uploads Folder (for temporary files only) ===
// Cloudinary will handle permanent storage, but this keeps temp uploads functional.
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// === API Routes ===
app.use("/api/upload", uploadRoutes); //  singular for consistency with frontend axiosInstance.post("/upload")
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

// === PayPal Config Route (optional) ===
app.get("/api/config/paypal", (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

// === Root route ===

app.get("/", (req, res) => {
  res.send("API is running and connected to MongoDB & Cloudinary");
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// === Start Server ===
const port = config.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
