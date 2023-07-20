import React, { useContext, useEffect, useState } from "react";
import AccountInfo from "./AccountInfo.js";
import GameDisplay from "./GameDisplay";
import './Home.css';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App.js";

function Home() {
  // const [gameList, setGameList] = useState([]);
  const { gameList, setGameList } = useContext(AppContext);
  const navigate = useNavigate();
  const {resetHome, user, setUser} = useContext(AppContext);


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
    res?.loggedIn ? setUser(res) : setUser({loggedIn: false});
    console.log('This is the state value:', user.loggedIn)
    console.log('This is the User Object:', user);
  }

  useEffect(() => {
    grabGames();
    checkLogin();

  }, [resetHome, user.loggedIn])

  return (
    <>
      <div className='create-game-container'>
        {user.loggedIn ? (<button className='create-game-button' onClick={() => {
          navigate('/create-game')
        }}>Add a new game post</button>)
          : (<></>)}
      </div>
      <AccountInfo />
      <div>
        <GameDisplay />
      </div>
    </>
  )
}

export default Home;