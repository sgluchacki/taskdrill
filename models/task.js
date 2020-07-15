const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
    },
    isTemplate: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parentTask: {
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: false
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);