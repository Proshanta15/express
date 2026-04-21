import express from "express";

const app = express();

// function ageCheck(req, res, next) {
//   if (!req.query.age || req.query.age < 18) {
//     // Check if age is provided and is at least 18
//     return res.send("You must be at least 18 years old to access this page.");
//   } else {
//     next();
//   }
// }
// app.use(ageCheck);

//ip address
function ipCheck(req, res, next) {
  const ip = req.socket.remoteAddress;
  console.log(ip);
  if (ip.includes("192.168.0.185")) {
    return res.send("Access denied: Localhost IP address is not allowed.");
  } else {
    next();
  }
}
app.use(ipCheck);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/login", (req, res) => {
  res.send("Login Page");
});

app.get("/admin", (req, res) => {
  res.send("Admin Page");
});

app.listen(3000);
