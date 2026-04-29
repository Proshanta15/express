import express from "express";
import multer from "multer";

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/upload", (req, res) => {
  // Handle file upload logic here
  res.send(`
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit">Upload</button>
    </form>
  `);
});

app.post("/upload", upload.single("file"), (req, res) => {
  // Handle file upload logic here
  res.send({
    message: "File uploaded successfully",
    info: req.file,
  });
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
