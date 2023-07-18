import React, { useEffect, useState } from "react";
import Account from "./Account";
import GameDisplay from "./GameDisplay";

function Home() {
  const [gameList, setGameList] = useState([]);

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
      <Account />
      <div>
        <GameDisplay gameList={gameList} />
      </div>
    </>
  )
}

export default Home;