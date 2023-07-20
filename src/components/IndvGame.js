import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../App';
import './IndvGame.css'

function IndvGame() {
  const [postCreator, setPostCreator] = useState('');
  const navigate = useNavigate();

  let selectedGame = useParams()
  console.log(selectedGame);
  const { gameList } = useContext(AppContext);
  const filteredGame = gameList.filter((game) => (`${game.id}` === selectedGame.id))
  console.log(filteredGame[0]);

  const grabUserNames = async () => {
    const req = await fetch(`http://localhost:8080/get-user/${filteredGame[0].user_id}`);
    const res = await req.json();
    // console.log(res);
    setPostCreator(res.username);
  }

  useEffect(() => {
    grabUserNames();
  }, [])

  return (
    <div>
      <div className='game-information-container'>
        <div className='game-information-field'>Game Post's Author: {postCreator}</div>
        <div className='game-information-field'>Game Title: {filteredGame[0].title}</div>
        <div className='game-information-field'>Game Release Date: {filteredGame[0].release_date}</div>
        <div className='game-information-field'>Game Developer: {filteredGame[0].developer}</div>
        <div className='game-information-field'>Game Description: {filteredGame[0].description}</div>
      </div>
      <button className='home-button' onClick={() => navigate('/')}>Return Home</button>
    </div>
  )
}

export default IndvGame;