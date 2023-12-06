const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./db/connectDB");
const TaskController = require("./controllers/TaskController");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3500;
app.use(express.json());
app.use(cors());
app.post("/add", TaskController.addTask);
app.get("/list", TaskController.listOfTasks);
app.get("/list/:id", TaskController.oneTask);
app.put("/list/:id", TaskController.updateTask);
app.delete("/list/:id", TaskController.deleteTask);
app.listen(port, () => {
  connectDB();
  console.log(`server listenning on ${port}`);
});
