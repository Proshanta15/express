import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// create __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "views", "home.html");
  res.sendFile(filePath);
});

app.get("/about", (req, res) => {
  const filePath = path.join(__dirname, "views", "about.html");
  res.sendFile(filePath);
});

// app.use((req, res) => {
//   const filePath = path.join(__dirname, "views", "404.html");
//   res.status(404).sendFile(filePath);
// });
app.use((req, res) => {
  const filePath = path.join(__dirname, "views", "404.html");
  res.status(404).sendFile(filePath);
});
app.listen(3000);
