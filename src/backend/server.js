const express = require('express')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const knex = require('knex')( require('../../knexfile.js')[process.env.NODE_ENV || 'development'])
const port = 8080;

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials:  true
}

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json())

//////          GET REQUESTS          //////

app.get('/gamelist', (req, res) => {
  knex.select().from('game_list')
    .then(data => res.send(data))
})

app.get('/users', (req, res) => {
  knex.select().from('users')
    .then(data => res.send(data))
})

app.get('/get-username/:userid', async (req, res) => {  // Get a specific user by ID & sends back username
  const userid = req.params.userid;

  const user = await knex.select('username').from('users').where({id: userid});
  res.status(200).send(user[0]);
})

app.get('/get-userid/:username', async (req, res) => {  // Get a specific user by username & sends back ID
  const username = req.params.username;
  // console.log('UserID Route username: ', username);

  const user = await knex.select('id').from('users').where({username: username});
  // console.log('This is the userid route: ', user);
  res.status(200).send(user[0]);
})

app.get('/check-cookie', (req, res) => {  //  Checks if a user is actively logged in
  const activeUsername = req.cookies.username;
  // console.log(activeUsername);

  activeUsername ? res.status(200).send({ 
    loggedIn: true,
    username: activeUsername
  })
    : res.status(200).send({ loggedIn: false })
})

app.get('/login/user/:username-:password', async (req, res) => {  //  Checks if given username is in DB
  const userInfo = req.params;
  // console.log(userInfo);
  let accountMatch = false;

  const users = await knex.select('username', 'password').from('users')
  // console.log(users)
  users.forEach((user) => {  //  Loop through usernames & passwords in DB, if match for both is found return true
    if (user.username === userInfo.username) {
      if (user.password === userInfo.password) {
        return accountMatch = true;
      }
    } else accountMatch;
  })

  if (accountMatch) {
    res.cookie('username', `${userInfo.username}`)
    res.send({
      message: 'Successful Login'
    })
  } else {
    res.status(401).send({
      message: 'Failed Login'
    })
  }
})

app.get('/clear-cookies', (req, res) => {  //  Clears browser localhost cookies
  res.clearCookie('username');
  res.status(200).send({
    message: 'Cookies Cleared'
  })
})

//////          PUT REQUESTS          //////

app.put('/editgame/:id', (req, res) => {
  const id = Number(req.params.id);
  const updateGame = req.body;
  // console.log(updateGame);
  // console.log(id);
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

app.post('/create-game', (req, res) => {
  const newGame = req.body;
  // console.log(newGame);
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

app.post('/create-account/',  async (req, res) => {
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
      .then(() => {
        res.cookie('username', `${newUser.username}`);
        res.status(201).send({
          message: 'User created OK'
        })
      })
      .catch((err) => console.log(err));
  } else {
    res.status(400).send({ message: 'User already exists' })
  }
})

//////          DEL REQUESTS          //////

app.delete('/delete-game/:id', (req, res) => {
  const id = Number(req.params.id)
  // console.log(id)
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