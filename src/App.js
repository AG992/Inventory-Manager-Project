import React, { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import CreateGame from './components/CreateGame.js'
import AccountCreate from './components/AccountCreate';
import IndvGame from './components/IndvGame';
import UserPosts from './components/UserPosts';

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState({});
  const [resetHome, setResetHome] = useState(true)
  const [gameList, setGameList] = useState([])

  return (
    <div className="App">
      <AppContext.Provider value={{user, setUser, resetHome, setResetHome, gameList, setGameList}}>
        <Routes className='routes'>
          <Route path='/' element={<Home />} />
          <Route path='/create-game' element={<CreateGame />} />
          <Route path='/create-account' element={<AccountCreate />} />
          <Route path='/game/:title/:id' element={<IndvGame />} />
          <Route path='/your-posts' element={<UserPosts />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
