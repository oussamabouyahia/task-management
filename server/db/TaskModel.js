const mongoose = require("mongoose");

const Taskschema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter an title"],
  },
  description: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  due_date: {
    type: Date,
  },
});
const Task = mongoose.model("Task", Taskschema);

module.exports = Task;
