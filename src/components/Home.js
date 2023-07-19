import React, { useEffect, useState } from "react";
import Account from "./Account";
import GameDisplay from "./GameDisplay";
import './Home.css';
import { Route, Routes, useNavigate } from "react-router-dom";
import CreateGame from "./CreateGame";

function Home() {
  const [gameList, setGameList] = useState([]);
  const navigate = useNavigate();

  const grabGames = async () => {
    const request = await fetch('http://localhost:8080/gamelist')
    const currentGameList = await request.json();
    setGameList(currentGameList);
  }

  useEffect(() => {
    grabGames();
  }, [])

  return (
    <>
      <div className='create-game-container'>
        <button className='create-game-button' onClick={() => {
          navigate('/create-game')
        }}>Add a new game post</button>
      </div>
      <Account />
      <div>
        <GameDisplay gameList={gameList} />
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-game' element={<CreateGame />} />
      </Routes>
    </>
  )
}

export default Home;