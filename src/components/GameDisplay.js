import React, { useContext } from "react";

function GameDisplay({gameList}) {

  return (
    <>
      {gameList.map((game) => {
        return(
          <div className='game-card centered' key={`gameid:${game.id}`}>
            <div className='game-info-field' key={`gametitle:${game.id}`}>{game.title}</div>
            <div className='game-info-field' key={`gamedate:${game.id}`}>{game.release_date}</div>
            <div className='game-info-field' key={`gamedesc:${game.id}`}>{game.developer}</div>
          </div>
        )
      })}
    </>
  )
}

export default GameDisplay;