import dotenv from 'dotenv';
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
