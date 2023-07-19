const express = require('express')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const knex = require('knex')( require('../../knexfile.js')[process.env.NODE_ENV || 'development'])
const bodyParser = require('body-parser');
const port = 8080;

app.use(cors());
app.use(cookieParser());

app.get('/gamelist', (req, res) => {
  knex.select().from('game_list')
    .then(data => res.send(data))
})

app.get('/get-cookie', (req, res) => {
  res.cookie('name', 'John-Doe');
  res.send('You\'ve been cookified!')
})

app.get('/receive-cookie', (req, res) => {
  console.log('Cookies: ', req.cookies)
})

app.put('/editgame/:id', bodyParser.json(), (req, res) => {
  const id = Number(req.params.id);
  const updateGame = req.body;
  console.log(updateGame);
  console.log(id);
  knex('game_list')
    .where({id: id})
    .update({
      title: updateGame.title,
      release_date: updateGame.release_date,
      developer: updateGame.developer,
      description: updateGame.description,
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})