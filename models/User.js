const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    tasks:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
    }]
})

const User = mongoose.model('user',userSchema)
module.exports = User