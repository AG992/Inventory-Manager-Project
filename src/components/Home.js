import React, { useContext, useEffect, useState } from "react";
import AccountInfo from "./AccountInfo.js";
import GameDisplay from "./GameDisplay";
import './Home.css';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App.js";

function Home() {
  const [gameList, setGameList] = useState([]);
  const navigate = useNavigate();

  const {resetHome, userLoggedIn, setUserLoggedIn} = useContext(AppContext);


  const grabGames = async () => {
    const request = await fetch('http://localhost:8080/gamelist')
    const currentGameList = await request.json();
    setGameList(currentGameList);
  }

  const checkLogin = async () => {
    const request = await fetch('http://localhost:8080/check-cookie', {
      credentials: 'include',
    });
    const res = await request.json();
    console.log('This is the Server response:', res);
    res?.loggedIn ? setUserLoggedIn(true) : setUserLoggedIn(false);
    console.log('This is the state value:', userLoggedIn)
  }

  useEffect(() => {
    grabGames();
    checkLogin();

  }, [resetHome, userLoggedIn])

  return (
    <>
    <button onClick={checkLogin}>Test</button>
      <div className='create-game-container'>
        {userLoggedIn ? (<button className='create-game-button' onClick={() => {
          navigate('/create-game')
        }}>Add a new game post</button>)
          : (<></>)}
      </div>
      <AccountInfo />
      <div>
        <GameDisplay gameList={gameList} />
      </div>
    </>
  )
}

export default Home;