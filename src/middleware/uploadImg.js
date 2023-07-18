const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder to save the uploaded files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

// Create the multer middleware instance
const upload = multer({ storage: storage });

module.exports = upload;
