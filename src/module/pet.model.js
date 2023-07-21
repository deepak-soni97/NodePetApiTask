const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  id:{
      type:Number,
      require:true
  },
  name:{
      type:String
  }
})

const tagSchema = new mongoose.Schema({
  id:{
      type: Number,
      required: true
  },
  name:{
      type: String,
    required: true
  }
})

const petSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  category:categorySchema,
  name: {
    type: String,
    required: true
  },
  photoUrls: [{
    type: String,
    required: true
  }],
  tags:[tagSchema],
  status: {
    type: String,
    required: true,
    enum: ['available', 'pending', 'sold']
  }
});


module.exports = mongoose.model('Pet', petSchema);