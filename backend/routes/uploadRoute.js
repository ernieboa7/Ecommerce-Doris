


/*import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import config from '../config.js';

const router = express.Router();

// Ensure local uploads directory exists
const localUploadDir = path.resolve('uploads');
if (!fs.existsSync(localUploadDir)) {
  fs.mkdirSync(localUploadDir);
}

// Local file storage config
const localStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadLocal = multer({ storage: localStorage });

// Local upload route

router.post('/', uploadLocal.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const filePath = `/${req.file.path.replace(/\\/g, '/')}`;
    res.send(filePath);
  } catch (error) {
    console.error('Local upload error:', error.message);
    res.status(500).send('Server error during local upload.');
  }
});




// AWS S3 client setup
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'eu-west-1',
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
});

// S3 storage config
const s3Storage = multerS3({
  s3,
  bucket: process.env.AWS_BUCKET_NAME || 'susana-bucket',
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, `uploads/${Date.now()}-${file.originalname}`);
  },
});

const uploadS3 = multer({ storage: s3Storage });



// S3 upload route
router.post('/s3', uploadS3.single('image'), (req, res) => {
  try {
    if (!req.file || !req.file.location) {
      return res.status(400).send('S3 upload failed.');
    }
    res.send(req.file.location);
  } catch (error) {
    console.error('S3 upload error:', error.message);
    res.status(500).send('Server error during S3 upload.');
  }
});

export default router;
*/


import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // folder to save uploaded images
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Route to handle file upload
router.post('/', upload.single('image'), (req, res) => {
  res.send({ url: `/${req.file.path}` }); // return image URL
});

export default router;
