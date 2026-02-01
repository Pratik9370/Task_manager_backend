const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    category:{
        type: String
    },
    deadline:{
        type: Date
    },
    status:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Task = mongoose.model('task',taskSchema)
module.exports = Task