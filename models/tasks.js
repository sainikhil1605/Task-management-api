const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Task name is required'],
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});
module.exports = mongoose.model('Task', TaskSchema);
