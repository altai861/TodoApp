const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    main: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    dueDate: {
        type: Date,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    ofWhatList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskList',
        required: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema)