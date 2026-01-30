const multer = require("multer");
const path = require("path");

/**
 * Shared limits
 */
const limits = {
  fileSize: 20 * 1024 * 1024 // 20MB
};

/**
 * IMAGE STORAGE
 */
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const imageFileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowed.includes(file.mimetype)) {
    cb(new Error("Only JPG, JPEG, PNG images are allowed"), false);
  }
  cb(null, true);
};

const uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits
});

/**
 * VIDEO STORAGE
 */
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const videoFileFilter = (req, file, cb) => {
  const allowed = ["video/mp4", "video/quicktime"];
  if (!allowed.includes(file.mimetype)) {
    cb(new Error("Only MP4 and MOV videos are allowed"), false);
  }
  cb(null, true);
};

const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits
});

module.exports = {
  uploadImage,
  uploadVideo
};
