const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the destination folder to save the uploaded files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    cb(null, file.fieldname + '-' + Date.now() + ".jpg");
  }
});

// Create the multer middleware instance
const upload = multer({ storage: storage });

module.exports = upload;
