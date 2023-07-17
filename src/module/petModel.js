const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  category: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  name: {
    type: String,
    required: true
  },
  photoUrls: {
    type: [String],
    required: true
  },
  tags: [
    {
      id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      }
    }
  ],
  status: {
    type: String,
    required: true
  }
});


module.exports = mongoose.model('Pet', petSchema)