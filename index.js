import express from "express";
import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017";
const dbName = "school";
const client = new MongoClient(url);

const app = express();

app.get("/", async (req, res) => {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection("students");

  const result = await collection.find().toArray();
  console.log(result);
  res.send("hello");
});

app.listen(3000);
