import express from 'express';

const app = express();

app.get('/', (req, res) => {
  const users = ['Alice', 'Bob', 'Charlie'];
  let data = `<ul>`;
  for(let i = 0; i<users.length; i++){
    console.log(users[i]);
    data += `<li><a href="/user/${users[i]}">${users[i]} </a></li>`;
  }
  data += `</ul>`;
  res.send(data);
});

app.get('/user/:name', (req, res) =>{
  console.log(req.params.name);
  
  res.send(`User: ${req.params.name}  <br> <a href="/">Back to Home</a>`);
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});