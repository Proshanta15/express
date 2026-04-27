import express from "express";
import mongoose from "mongoose";
import studentModel from "./model/studentModel.js";
const app = express();

await mongoose
  .connect("mongodb://127.0.0.1:27017/school")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.get("/", async (req, res) => {
  const studentData = await studentModel.find();
  res.send(studentData);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
