const mongoose = require('mongoose');

const storeOrderSchema = new mongoose.Schema({
    id:{
        type: String,
        require: true
    },
    petId:{
        type: Number,
        require: true
    },
    quantity:{
        type: Number,
        require: true
    },
    shipDate:{
        type:Date,
        require: true
    },
    status:{
       type:String,
       require: true
    },
    complete:{
        type:Boolean,
        require: true
    }

});

module.exports = mongoose.model('StoreOrder', storeOrderSchema);