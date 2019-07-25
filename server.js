const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const db = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'chriszhang',
    password : '',
    database : 'smart-brain'
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/register');
const image = require('./controllers/image');

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {})
app.post('/signin', signin.handleSignIn(db, bcrypt)) //syntax 1
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)}) //syntax 2
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall  (req, res)})


app.listen(process.env.PORT || 3000, () => {
  console.log(`app is runnning on port ${process.env.PORT}`);
});
