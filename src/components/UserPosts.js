import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GameDisplay from "./GameDisplay";
import { AppContext } from "../App";

function UserPosts() {
  const navigate = useNavigate();
  // const [userid, setUserId] = useState();
  const { gameList, user } = useContext(AppContext);
  const [userPosts, setUserPosts] = useState([]);
  const [resetPage, setResetPage] = useState(false);
  // console.log(gameList)

  const filterGames = async () => {
    const req = await fetch(`http://localhost:8080/get-userid/${user.username}`)
    const res = await req.json();
    // console.log(res.id);
    let userid = res.id;

    let filteredPosts = gameList.filter((game) => game.user_id === userid);
    setUserPosts(filteredPosts);
    // console.log(filteredPosts);
  }

  useEffect(() => {
    filterGames();

  }, [resetPage])

  return (
    <div>
      <div>These are {`${user.username}'s`} posts</div>
      <button onClick={() => navigate('/')}>Return Home</button>
      <>
        {userPosts.length ? userPosts.map((game) => {
          return (
            <div className='game-card centered'
              key={`gameid:${game.id}`}
              onClick={() => navigate(`/game/${game.title}/${game.id}`)}>
              <div className='game-info-field' key={`gametitle:${game.id}`}>{game.title}</div>
              <div className='game-info-field' key={`gamedate:${game.id}`}>{game.release_date}</div>
              <div className='game-info-field' key={`gamedesc:${game.id}`}>{
                game.description.length < 100 ? game.description
                  : game.description.substring(0, 99) + ' ...'
              }</div>
            </div>
          )
        })
          : <div>You don't have any posts yet. Head back to the home page to make some!</div>}
      </>
    </div>
  )
}

export default UserPosts;