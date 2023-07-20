import React, { useContext, useEffect, useState } from "react";
import './GameDisplay.css';
import Popup from "reactjs-popup";
import { AppContext } from "../App";
import { Link, useNavigate } from "react-router-dom";


function GameDisplay({ gameList }) {
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editDeveloper, setEditDeveloper] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const { resetHome, setResetHome, user } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {

  }, [gameList])

  return (
    <>
      {gameList.map((game) => {
        const editButton = <Popup
          trigger={() => <button className="game-edit-button">Edit</button>}
          position="bottom center"
          children={() => {
            return (
              <div className='popup-container'>
                <h5>Edit {`${game.title}'s`} information</h5>
                <div className='game-edit-field'>
                  <label>Game's Title: </label>
                  <input type='text' onChange={(e) => setEditTitle(e.target.value)} />
                </div>
                <div className='game-edit-field'>
                  <label>Game's Release Date: </label>
                  <input type='date' onChange={(e) => setEditDate(e.target.value)} />
                </div>
                <div className='game-edit-field'>
                  <label>Game's Developer: </label>
                  <input type='text' onChange={(e) => setEditDeveloper(e.target.value)} />
                </div>
                <div className='game-edit-field'>
                  <label>Game Description: </label>
                  <textarea onChange={(e) => setEditDesc(e.target.value)} />
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
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(newEdits)
                    }

                    await fetch(`http://localhost:8080/editgame/${game.id}`, editOptions)
                      .then(res => res.json())
                      .then(data => {
                        // console.log(data);
                        setResetHome(!resetHome);
                      })
                      .catch((err => console.log(err)));
                  }}>Submit Edits</button>
                </div>
              </div>
            )
          }}
          closeOnDocumentClick
        />

        const deleteButton = <button className='game-delete-button' onClick={() => {
          const deleteOptions = {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          }
          fetch(`http://localhost:8080/delete-game/${game.id}`, deleteOptions)
            .then(res => res.json())
            .then(data => {
              // console.log(data);
              setResetHome(!resetHome);
            })
            .catch((err) => console.log(err))
        }}>Delete</button>

        return (
          <div className='game-card centered' key={`gameid:${game.id}`} >
            <Link to={`/game/${game.title}/${game.id}`}>
              <div className='game-info-field' key={`gametitle:${game.id}`}>{game.title}</div>
            </Link>
            <div className='game-info-field' key={`gamedate:${game.id}`}>{game.release_date}</div>
            <div className='game-info-field' key={`gamedesc:${game.id}`}>{
              game.description.length < 100 ? game.description
                : game.description.substring(0, 99) + ' ...'
            }</div>
            {user.loggedIn ? editButton : (<></>)}
            {user.loggedIn ? deleteButton : (<></>)}
          </div>
        )
      })}
    </>
  )
}

export default GameDisplay;