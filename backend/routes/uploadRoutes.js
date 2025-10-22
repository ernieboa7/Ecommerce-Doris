
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
