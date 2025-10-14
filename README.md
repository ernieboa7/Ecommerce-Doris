🛍️ MERN E-Commerce Web Application

A full-featured eCommerce platform built using the MERN stack (MongoDB, Express.js, React, Node.js).
It allows users to browse products, add them to a cart, checkout via PayPal, and includes a complete admin panel for managing products, users, and orders.

🚀 Live Demo

👉 Live Website

👉 GitHub Repository

🧩 Tech Stack
Category	Technologies Used
Frontend	React, React Router, Redux, Axios, Bootstrap
Backend	Node.js, Express.js, Mongoose
Database	MongoDB Atlas
Authentication	JSON Web Token (JWT)
File Uploads	Multer (Express middleware)
Payments	PayPal REST API
Deployment	Render / Railway / Vercel / Netlify
Version Control	Git & GitHub
📦 Features
👥 User Features

Secure login and registration (JWT authentication)

Browse, search, and view product details

Add/remove items from cart

Checkout securely using PayPal

View order history and details

Persistent cart with local storage

🛠️ Admin Features

Manage (Add/Edit/Delete) products

Upload product images using Multer

View and manage customer orders

Manage users (promote/demote admins)

Dashboard analytics (if added)

💾 Other Features

Mobile responsive UI

RESTful API design

Full production-ready build

CORS enabled for local and remote access

⚙️ Project Structure
📦 Online_Shopping_Project
 ┣ 📂 backend
 ┃ ┣ 📂 config
 ┃ ┣ 📂 models
 ┃ ┣ 📂 routes
 ┃ ┣ 📂 uploads
 ┃ ┣ 📂 images
 ┃ ┣ 📜 util.js
 ┃ ┣ 📜 config.js
 ┃ ┣ 📜 server.js
 ┃ ┣ 📜 seeder.js
 ┃ ┗ 📜 data.js
 ┣ 📂 frontend
 ┃ ┣ 📂 public
 ┃ ┣ 📂 src
 ┃ ┃ ┣ 📂 actions
 ┃ ┃ ┣ 📂 reducers
 ┃ ┃ ┣ 📂 constants
 ┃ ┃ ┣ 📂 components
 ┃ ┃ ┣ 📂 screens
 ┃ ┃ ┣ 📜 store.js
 ┃ ┃ ┣ 📜 App.js
 ┃ ┃ ┗ 📜 index.js
 ┃ ┣ 📜 .env
 ┣ 📜 .env
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 LICENSE

🧠 How to Run Locally
1️⃣ Clone the Repository
git clone https://github.com/yourusername/mern-ecommerce.git
cd Online_Shopping_Project

2️⃣ Install Dependencies
# Install backend dependencies
npm install

# Go to frontend folder
cd frontend
npm install

3️⃣ Add Environment Variables
📁 Create .env in Root (Backend)
PORT=5000
MONGODB_URL=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id

📁 Create .env in Frontend
REACT_APP_API_URL=http://localhost:5000
REACT_APP_PAYPAL_CLIENT_ID=your_paypal_client_id

⚡ Database Setup
Seed Initial Data
npm run data:import


This loads default users and products from data.js.
To clear the database, run:

npm run data:destroy

🧩 Available Scripts
Command	Description
npm run server	Run backend only
npm run client	Run frontend only
npm run dev	Run both concurrently (if configured)
npm run build	Build production-ready frontend
npm run data:import	Import sample products/users
npm run data:destroy	Delete all data from MongoDB
🚀 Deployment Guide

1️⃣ Build frontend

cd frontend
npm run build


2️⃣ Serve frontend via Express
Your backend server.js already handles production:

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});


3️⃣ Deploy

Deploy to Render, Railway, or Vercel.

Add all environment variables in your hosting provider’s dashboard.

Make sure your MongoDB Atlas cluster is accessible from the hosting IP.

🔐 Environment Variables Summary
Variable	Location	Description
PORT	Backend .env	Server port
MONGODB_URL	Backend .env	MongoDB Atlas connection string
JWT_SECRET	Backend .env	JWT token secret
PAYPAL_CLIENT_ID	Both .env	PayPal API client ID
REACT_APP_API_URL	Frontend .env	API base URL
🧑‍💻 Author

Ernest Eboagwu
💻 Full-Stack Developer
🌍 GitHub

💼 LinkedIn

📝 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute with attribution.