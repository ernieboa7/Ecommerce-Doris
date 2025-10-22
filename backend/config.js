/*import dotenv from 'dotenv';
import { Admin } from 'mongodb';
dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  Admin_SECRET: process.env.ADMIN_SECRET || 'Nas',
};



//console.log("MongoDB URL from env:", process.env.MONGODB_URL);
*/


import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Make sure dotenv loads from the backend directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Optional debug check
console.log("MONGODB_URL from .env:", process.env.MONGODB_URL);

export default {
  PORT: process.env.PORT || 5001,
  MONGODB_URL:
    process.env.MONGODB_URL ||
    'mongodb://localhost/amazona', // fallback for local dev
  JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  ADMIN_SECRET: process.env.ADMIN_SECRET || 'Nas',
};
