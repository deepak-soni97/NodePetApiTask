const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
        id: {
             type: Number, 
            require: true,
        },
    username: {
        type: String, 
        require: true,
    },
    firstName: { 
        type: String,
         require: true
         },
    lastName: {
         type: String, 
         require: true 
        },
    email: { 
        type: String, 
        require: true 
    },
    password: { 
        type: String, 
        require: true 
    },
    phone: { 
        type: String, 
        require: true
     },
    userStatus: {
         type: Number, 
         require: true 
        },

})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

module.exports = mongoose.model('user', userSchema);