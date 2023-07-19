import React, { useContext, useState } from "react";
import './GameDisplay.css';
import Popup from "reactjs-popup";

function GameDisplay({gameList}) {
  const [editTitle, setEditTitle] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editDeveloper, setEditDeveloper] = useState('')
  const [editDesc, setEditDesc] = useState('')

  return (
    <>
      {gameList.map((game) => {
        return(
          <div className='game-card centered' 
            key={`gameid:${game.id}`} 
            onClick={() => {
            console.log(game.description.length)
          }}>
            <div className='game-info-field' key={`gametitle:${game.id}`}>{game.title}</div>
            <div className='game-info-field' key={`gamedate:${game.id}`}>{game.release_date}</div>
            <div className='game-info-field' key={`gamedesc:${game.id}`}>{
              game.description.length < 100 ? game.description
                : game.description.substring(0, 99) + ' ...'
            }</div>
            <Popup
              trigger={() => <button className="game-edit-button">Edit</button>}
              position="bottom center"
              children={() => {
                return(
                  <div className='popup-container'>
                    <h5>Edit {`${game.title}'s`} information</h5>
                    <div className='game-edit-field'>
                      <label>Game's Title: </label>
                      <input type='text' onChange={(e) => setEditTitle(e.target.value)}/>
                    </div>
                    <div className='game-edit-field'>
                      <label>Game's Release Date: </label>
                      <input type='date' onChange={(e) => setEditDate(e.target.value)}/>
                    </div>
                    <div className='game-edit-field'>
                      <label>Game's Developer: </label>
                      <input type='text' onChange={(e) => setEditDeveloper(e.target.value)}/>
                    </div>
                    <div className='game-edit-field'>
                      <label>Game Description: </label>
                      <input type='text' onChange={(e) => setEditDesc(e.target.value)}/>
                    </div>
                    <div>
                      <button className='centered' onClick={async () => {
                        const newEdits = {
                          title: editTitle, 
                          release_date: editDate,
                          developer: editDeveloper,
                          description: editDesc,
                        }
                        
                        const editOptions = {
                          method: 'PUT',
                          headers:{
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(newEdits)
                        }

                        await fetch(`http://localhost:8080/editgame/${game.id}`, editOptions)
                          .then(() => {
                            window.location.reload()
                          })
                      }}>Submit Edits</button>
                    </div>
                  </div>
                )}}
              // onClose={() => setGameChanges([])}
              closeOnDocumentClick
            >
            </Popup>
            <button className='game-delete-button' >Delete</button>
          </div>
        )
      })}
    </>
  )
}

export default GameDisplay;