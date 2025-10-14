import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import data from './data.js'; // contains sample products
import config from './config.js';

dotenv.config();

mongoose
  .connect(config.MONGODB_URL)
  .then(async () => {
    //await Product.deleteMany({});
    await Product.insertMany(data.products);
    console.log('Products seeded successfully');
    process.exit();
  })
  .catch((err) => console.error(err));
