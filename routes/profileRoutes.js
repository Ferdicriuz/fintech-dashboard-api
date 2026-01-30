const express = require("express");
const router = express.Router();

const {
  uploadImage,
  uploadVideo
} = require("../middleware/upload");

const {
  uploadProfileImage,
  uploadProfileVideo
} = require("../controllers/profileController");

router.post(
  "/upload-image",
  uploadImage.single("image"),
  uploadProfileImage
);

router.post(
  "/upload-video",
  uploadVideo.single("video"),
  uploadProfileVideo
);

module.exports = router;
