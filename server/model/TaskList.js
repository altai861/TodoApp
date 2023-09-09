const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: {
        type: Array,
        default: []
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('TaskList', taskListSchema)