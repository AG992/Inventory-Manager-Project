import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CreateGame.css'
import Popup from "reactjs-popup";

function CreateGame() {
  const [userList, setUserList] = useState();
  const [newGamePoster, setNewGamePoster] = useState(0);
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGameReleaseDate, setNewGameReleaseDate] = useState('');
  const [newGameDeveloper, setNewGameDeveloper] = useState('');
  const [newGameDesc, setNewGameDesc] = useState('');
  const navigate = useNavigate();

  const grabUsers = async () => {
    const request = await fetch('http://localhost:8080/users');
    const fetchedUsers = await request.json();
    setUserList(fetchedUsers);
  }

  useEffect(() => {
    grabUsers();
  }, [])

  return (
    <div className='create-game-container centered'>
      <h1>Create a new game post!</h1>
      <Link to='/'><h4 className="centered">or head back home... :(</h4></Link>
      <div className='create-game-field'>
        <label>Account Poster: </label>
        <select name='user-select' id='user-select' onChange={(e) => setNewGamePoster(e.target.selectedIndex)}>
          <option value='0' key='0'> </option>
          {userList?.map((user) => <option value={user.id} key={user.id}>{user.username}</option>)}
        </select>
      </div>
      <div className='create-game-field'>
        <label>Game Title: </label>
        <input type='text' onChange={(e) => setNewGameTitle(e.target.value)}/>
      </div>
      <div className='create-game-field'>
        <label>Game Release Date: </label>
        <input type='date' onChange={(e) => setNewGameReleaseDate(e.target.value)}/>
      </div>
      <div className='create-game-field'>
        <label>Game Developer: </label>
        <input type='text' onChange={(e) => setNewGameDeveloper(e.target.value)}/>
      </div>
      <div className='create-game-field'>
        <label>Game Description: </label>
        <textarea id="w3review" name="w3review" rows="4" cols="50" 
          placeholder='Enter game description here...' 
          onChange={(e) => setNewGameDesc(e.target.value)}>          
        </textarea>
      </div>
      <button className='centered' onClick={async () => {
        // On click user's data get's sent to the server / DB
        // DB is updated with user's data
        // User is sent back to the Home Page
        const newGameFields = [newGamePoster, newGameTitle, newGameReleaseDate, newGameDeveloper, newGameDesc]
        const newGame = {
          user_id: newGamePoster, 
          title: newGameTitle,
          release_date: newGameReleaseDate,
          developer: newGameDeveloper,
          description: newGameDesc,
        }
        
        const newGameOptions = {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newGame)
        }
        
        fetch('http://localhost:8080/create-game', newGameOptions)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setTimeout(() => navigate('/'), 100);
          })
          .catch((err) => console.log(err));
      }}>Submit your Entry!</button>
    </div>
  )
}

export default CreateGame;