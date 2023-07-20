import React, { createContext, useState } from 'react';
import './App.css';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import CreateGame from './components/CreateGame.js'
import AccountCreate from './components/AccountCreate';

export const AppContext = createContext();

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [resetHome, setResetHome] = useState(true)

  return (
    <div className="App">
      <AppContext.Provider value={{userLoggedIn, setUserLoggedIn, resetHome, setResetHome}}>
        <Routes className='routes'>
          <Route path='/' element={<Home />} />
          <Route path='/create-game' element={<CreateGame />} />
          <Route path='/create-account' element={<AccountCreate />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;
