import React, { useEffect, useState } from "react";
import Account from "./Account";
import GameDisplay from "./GameDisplay";
import './Home.css';
import { useNavigate } from "react-router-dom";

function Home() {
  const [gameList, setGameList] = useState([]);
  const navigate = useNavigate();
  const [resetGames, setResetGames] = useState(true)

  const grabGames = async () => {
    const request = await fetch('http://localhost:8080/gamelist')
    const currentGameList = await request.json();
    setGameList(currentGameList);
  }

  useEffect(() => {
    grabGames();
  }, [resetGames])

  return (
    <>
      <div className='create-game-container'>
        <button className='create-game-button' onClick={() => {
          navigate('/create-game')
        }}>Add a new game post</button>
      </div>
      <Account />
      <div>
        <GameDisplay gameList={gameList} resetGames={resetGames} setResetGames={setResetGames} />
      </div>
    </>
  )
}

export default Home;