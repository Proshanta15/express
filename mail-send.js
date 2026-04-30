import express from 'express';

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get("/mail", (req, res) => {
    res.render("mail");
});

app.post("/submit-email", (req, res) => {
    // Logic to send email goes here
    res.send("Email sent successfully!");
    console.log(req.body);
    
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});