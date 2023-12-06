const Task = require("../db/TaskModel");

const addTask = async (req, res) => {
  const { title, description, due_date } = req.body;
  try {
    const existingTask = await Task.findOne({ title }).exec();
    if (existingTask) {
      return res.status(409).json({ message: "task title already exist" });
    }
    const newTask = new Task({ title, description, due_date });
    await newTask.save();
    res.status(201).json({ message: "task added successfully ", newTask });
  } catch (error) {
    res.sendStatus(500);
  }
};
const listOfTasks = async (req, res) => {
  try {
    const tasks = await Task.find().exec();
    !tasks.length
      ? res.status(404).json({ message: "no tasks found!" })
      : res.status(200).json({ message: "here is the tasks list", tasks });
  } catch (error) {
    if (error.name === "CastError") {
      // Handle the case where the provided ID is not valid
      res.status(400).json({ message: "invalid task ID" });
    } else {
      // Handle other types of errors as internal server issues
      res.status(500).json({ message: "internal server issue" });
    }
  }
};
const oneTask = async (req, res) => {
  const { id } = req.params;
  try {
    const targetTask = await Task.findById(id);
    targetTask !== null
      ? res.status(200).json({ message: "task found successfully", targetTask })
      : res.status(404).json({ message: "task not found" });
  } catch (error) {
    res.status(500).json({ message: "internal server issue" });
  }
};
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed, due_date } = req.body;
  try {
    const updated = await Task.findByIdAndUpdate(
      id,
      { title, description, completed, due_date },
      { new: true }
    );
    updated !== null
      ? res.status(200).json({ updated, message: "updated successfully" })
      : res.status(404).json({ message: "not found" });
  } catch (error) {
    if (error.name === "CastError") {
      // Handle the case where the provided ID is not valid
      res.status(400).json({ message: "invalid task ID" });
    } else {
      // Handle other types of errors as internal server issues
      res.status(500).json({ message: "internal server issue" });
    }
  }
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    //id should be provided
    if (!id)
      return res
        .status(400)
        .send("a selected task is required to complete deleting");
    const targetTask = await Task.findById(id);
    //if Task exist will be deleted and a new list of Tasks updtated accordingly
    if (targetTask !== null) {
      await Task.findByIdAndDelete(id);
      res.status(200).json({
        message: `Task ${targetTask.title} deleted successfully `,
        newList: await Task.find(),
      });
    } else {
      res.status(404).send("task not found");
    }
  } catch (error) {
    console.log(error.message);
    res.sendStatus(500);
  }
};
module.exports = { addTask, listOfTasks, oneTask, updateTask, deleteTask };
