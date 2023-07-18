const express = require('express')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = 8080;

app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send(json('TEST'));
})

app.get('/get-cookie', (req, res) => {
  res.cookie('name', 'John-Doe');
  res.send('You\'ve been cookified!')
})

app.get('/receive-cookie', (req, res) => {
  console.log('Cookies: ', req.cookies)
})

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})