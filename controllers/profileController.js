const User = require("../models/User");

// exports.uploadProfileImage = async (req, res) => {
  
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No image uploaded",
//       });
//     }

//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     user.profileImage = `/uploads/${req.file.filename}`;
//     await user.save();

//     res.status(200).json({
//       success: true,
//       message: "Profile image uploaded successfully",
//       profileImage: user.profileImage,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Image upload failed",
//       error: error.message,
//     });
//   }
// };


exports.uploadProfileImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No image file uploaded"
    });
  }

  res.status(200).json({
    message: "Image uploaded successfully",
    file: {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    }
  });
};

exports.uploadProfileVideo = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      message: "No video file uploaded"
    });
  }

  res.status(200).json({
    message: "Video uploaded successfully",
    file: {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    }
  });
};
