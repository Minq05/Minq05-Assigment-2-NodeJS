import express from "express";
import mongoose from "mongoose";
import student from "./router/student.js";
import user from "./router/user.js";
const app = express();
app.use(express.json());
app.use("", student);
app.use("", user);
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/students");
    console.log("Ket noi thanh cong");
  } catch (error) {
    console.log();
  }
};
const port = 3000;
app.listen(port, async () => {
  await connectDB();
  console.log(`Listening on port ${port}`);
});
