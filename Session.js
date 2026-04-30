import express from "express";
import session from "express-session";

const app = express();
app.set("view engine", "ejs");
app.use(
  session({
    secret: "your_secret_key",
  }),
);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const data = req.session.data;
  res.render("home", { data });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/profile", (req, res) => {
  req.session.data = req.body;
  console.log(req.session.data);

  res.render("profile");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
