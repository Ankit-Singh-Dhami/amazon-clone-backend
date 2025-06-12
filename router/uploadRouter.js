const express = require("express");

const uploadController = require("../controller/uploadController");

const router = express.Router();

router.post(
  "/upload",
  uploadController.uploadMiddleware,
  uploadController.uploadImage
);

module.exports = router;
