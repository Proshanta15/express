import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const dbName = "school";
const client = new MongoClient(url);

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

client
  .connect()
  .then((connection) => {
    const db = connection.db(dbName);

    app.get("/api", async (req, res) => {
      const collection = db.collection("students");
      const students = await collection.find().toArray();
      res.send(students);
    });

    app.get("/show-students", async (req, res) => {
      const collection = db.collection("students");
      const result = await collection.find().toArray();
      console.log(result);
      res.render("students", { students: result });
    });

    app.get("/add", (req, res) => {
      res.render("add-student");
    });

    app.post("/add-student", async (req, res) => {
      const collection = db.collection("students");
      const result = await collection.insertOne(req.body);
      console.log(result);
      res.send(
        `<h1>Student added successfully</h1><a href="/show-students">Show Students</a>`,
      );
    });

    app.post("/add-student-api", async (req, res) => {
      console.log(req.body);
      if (!req.body.name || !req.body.age || !req.body.email) {
        return res.status(400).send("All fields are required");
      }
      const collection = db.collection("students");
      const result = await collection.insertOne(req.body);
      console.log(result);

      res.send("Student added successfully via API");
    });

    app.delete("/delete/:id", async (req, res) => {
      const collection = db.collection("students");
      const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      if (result) {
        res.send({
          message: "Student deleted successfully",
          success: true,
        });
      } else {
        res.send({
          message: "Student not found",
          success: false,
        });
      }
    });

    app.get("/show-students/delete/:id", async (req, res) => {
      const collection = db.collection("students");
      const result = await collection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      if (result) {
        res.send(
          `<h1>Student deleted successfully</h1><a href="/show-students">Show Students</a>`,
        );
      } else {
        res.send(
          `<h1>Student not found</h1><a href="/show-students">Show Students</a>`,
        );
      }
    });

    app.get("/show-students/edit/:id", async (req, res) => {
      console.log(req.params.id);
      const collection = db.collection("students");
      const result = await collection.findOne({
        _id: new ObjectId(req.params.id),
      });
      console.log(result);
      res.render("edit-student", { student: result });
    });

    app.get("/api/edit-student/:id", async (req, res) => {
      const collection = db.collection("students");
      const result = await collection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send({
        message: "Student found",
        success: true,
        student: result,
      });
    });

    app.post("/edit-student/:id", async (req, res) => {
      const collection = db.collection("students");
      const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
      );
      if (result) {
        res.send("Student updated successfully");
      } else {
        res.status(404).send("Student not found");
      }
    });

    app.put("/api/edit-student/:id", async (req, res) => {
      const collection = db.collection("students");
      const result = await collection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: req.body },
      );
      if (result) {
        res.send({
          message: "Student updated successfully",
          success: true,
        });
      } else {
        res.status(404).send({
          message: "Student not found",
          success: false,
        });
      }
    });

    console.log("Connected successfully to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.listen(3000);
