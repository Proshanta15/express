import express from "express";
import nodemailer from "nodemailer";

const app = express();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "prosantoroy166@gmail.com",
    pass: "ocnj kjgx oxrg hlrt",
  },
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/mail", (req, res) => {
  res.render("mail");
});

app.post("/submit-email", (req, res) => {
  // Logic to send email goes here
  const mailOptions = {
    from: "prosantoroy166@gmail.com",
    to: "prosantoroy166@gmail.com",
    subject: req.body.subject,
    text: req.body.message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.send("Error sending email");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully!");
    }
  });
  console.log(req.body);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
