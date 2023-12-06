require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DBURI)
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err.message));
};
module.exports = connectDB;
