const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'done'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        createdAt: {
            type: Date,
            default: Date.now
        },
    }
});

module.exports = mongoose.model('Task', taskSchema)