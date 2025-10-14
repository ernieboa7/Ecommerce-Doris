
/*
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Local imports
import config from './config.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import uploadRoute from './routes/uploadRoute.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// === Init Express ===
const app = express();

// === Middleware ===
app.use(bodyParser.json());

/*app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(cors()); // Allow all origins by default

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// === MongoDB Connection ===
mongoose.connect(config.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB Atlas successfully"))
.catch((err) => console.error("MongoDB connection error:", err.message));

// === API Routes ===
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

// PayPal Config Route
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

// === Serve Frontend ===
app.use(express.static(path.join(__dirname, '../frontend-react/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend-react/build', 'index.html'));
});


//import path from 'path';
//const __dirname = path.resolve();

/*app.use(express.static(path.join(__dirname, 'frontend-react/build')));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'frontend-react/build/index.html'))
);




// === Start Server ===
app.listen(config.PORT, () => {
  console.log(`Server started at http://localhost:${config.PORT}`);
});

*/


import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// === Local imports ===
import config from './config.js';
import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import orderRoute from './routes/orderRoute.js';
import uploadRoute from './routes/uploadRoute.js';

// === Paths ===
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// === Init Express ===
const app = express();

// === Middleware ===
app.use(bodyParser.json());
app.use(cors()); // Allow all origins

// === MongoDB Connection ===
mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas successfully'))
  .catch((err) => console.error('MongoDB connection error:', err.message));

// === Serve Uploads Folder ===
// Note: Render’s filesystem is ephemeral; use S3 or Cloudinary for persistent storage
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// === API Routes ===
app.use('/api/uploads', uploadRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

// === PayPal Config Route ===
app.get('/api/config/paypal', (req, res) => {
  res.send(config.PAYPAL_CLIENT_ID);
});

// === Base route ===
// This replaces the React serving code — keeps backend clean for API use
app.get('/', (req, res) => {
  res.send('API is running...');
});

// === Start Server ===
const port = config.PORT || 5001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
