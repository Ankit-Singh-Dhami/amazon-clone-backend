const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Upload route
router.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `http://localhost:3007/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
