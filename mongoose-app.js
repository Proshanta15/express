import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import studentModel from "./model/studentModel.js";

const app = express();

app.use(cors());
app.use(express.json());

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

app.post("/save", async (req, res) => {
  const result = req.body;
  const { name, age, email } = req.body;
  if (!req.body || !name || !age || !email) {
    res.send({
      message: "All fields are required",
      success: false,
    });
    return false;
  }
  const studentData = await studentModel.create(result);
  res.send({
    message: "Data saved successfully",
    success: true,
    data: studentData,
  });
});

app.put("/update/:id", async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  console.log(id);
  const studentData = await studentModel.findByIdAndUpdate(id, { ...req.body });

  res.send({
    message: "Update API is working",
    success: true,
  });
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await studentModel.findByIdAndDelete(id);
  res.send({
    message: "Delete API is working",
    success: true,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
