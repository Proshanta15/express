import { MongoClient } from "mongodb";

const url =
  "mongodb+srv://prosantoroy166_db_user:mIoXYDYD8gnNgKgZ@cluster0.iyoerbw.mongodb.net/?appName=Cluster0";
const database = "school";
const collection = "student";
const client = new MongoClient(url);

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

async function dbConnection() {
  const db = client.db(database);
  const collectionResult = db.collection(collection);
  const result = await collectionResult.find().toArray();
  console.log(result);
}

dbConnection();
