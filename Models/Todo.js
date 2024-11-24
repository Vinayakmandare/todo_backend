const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: [true, 'Task description is required'],
        trim: true,
    },
    done: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

const TodoModel = mongoose.model('todos', TodoSchema);

module.exports = TodoModel;
