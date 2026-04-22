import express from 'express';

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/add-user', (req, res) => {
  res.render('addUser');
});

app.post('/submit-user', (req, res) => {
  const { name, email } = req.body;
  res.render('submitUser', { name, email });
});

app.get('/users', (req, res) => {
  const users= [
    { name:'Proshanta', age:25 },
    { name:'Rahim', age:17 },
    { name:'Karim', age:30 }
  ];
  res.render('users', { users });
});

app.listen(3000);