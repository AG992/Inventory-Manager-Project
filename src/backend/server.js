const express = require('express')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const knex = require('knex')( require('../../knexfile.js')[process.env.NODE_ENV || 'development'])
const bodyParser = require('body-parser');
const port = 8080;

app.use(cors());
app.use(cookieParser());

//////          GET REQUESTS          //////

app.get('/gamelist', (req, res) => {
  knex.select().from('game_list')
    .then(data => res.send(data))
})

app.get('/users', (req, res) => {
  knex.select().from('users')
    .then(data => res.send(data))
})

// app.get('/get-cookie', (req, res) => {
//   res.cookie('name', 'John-Doe');
//   res.send('You\'ve been cookified!')
// })

// app.get('/receive-cookie', (req, res) => {
//   console.log('Cookies: ', req.cookies)
// })

//////          PUT REQUESTS          //////

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
    .then(res.status(200).send({
      edit_status: 'Edit OK'
    }))
    .catch((err) => console.log(err));
});

//////          POST REQUESTS          //////

app.post('/create-game', bodyParser.json(), (req, res) => {
  const newGame = req.body;
  console.log(newGame);
  knex('game_list').insert({
    user_id: newGame.user_id,
    title: newGame.title,
    release_date: newGame.release_date,
    developer: newGame.developer,
    description: newGame.description,
  })
  .then(res.status(201).send({
    post_status: 'Post OK'
  }))  
  .catch((err) => console.log(err));
})

app.post('/create-account/', bodyParser.json(), async (req, res) => {
  const newUser = req.body;
  let createNewUser = true;
  // console.log(newUser);
  const users = await knex.select('username').from('users')  //  Query against all know usernames to see if new username isn't already in the DB
  users.forEach((user) => {
    if (user.username === newUser.username) return createNewUser = false
    else return createNewUser;
  })
  
  if (createNewUser) {
    knex('users').insert({
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      username: newUser.username,
      password: newUser.password,
    })
      .then(res.status(201).send({ message: 'User created OK' }))
      .catch((err) => console.log(err));
  } else {
    res.status(400).send({ message: 'User already exists' })
  }
})

//////          DEL REQUESTS          //////

app.delete('/delete-game/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  knex('game_list').where('id', id)
    .del()
    .then(res.status(200).send({
      delete_status: 'Delete OK'
    }))
    .catch((err) => console.log(err))
})

//////          MISC          //////

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})