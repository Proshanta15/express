import express from "express";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));

// Create directory and file

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/wait", (req, res) => {
  setTimeout(() => {
    res.send("Waited for 1 second");
  }, 1000);
});

app.listen(3000);
