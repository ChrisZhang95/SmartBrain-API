const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joind: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joind: new Date()
    },
  ]
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(database.users);
})

app.post('/signin', (req, res) => {
  if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
    res.json('success')
  } else {
    res.status(400).json('error signing in')
  }
})

app.post('/register', (req, res) => {
  const {email, name, password} = req.body;
  bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });

  database.users.push({
    id: '125',
    name: name,
    email: email,
    password: password,
    entries: 0,
    joind: new Date()
  })

  res.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  })
  if (!found) {
    res.status(400).json("not found");
  }
})

app.post('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach(user => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  })
  if (!found) {
    res.status(400).json("not found");
  }
})

app.listen(3000, () => {
  console.log('app is runnning on port 3000');
});