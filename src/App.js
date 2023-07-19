import React from 'react';
import './App.css';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import CreateGame from './components/CreateGame.js'
import AccountCreate from './components/AccountCreate';

function App() {
  return (
    <div className="App">
      <Routes className='routes'>
        <Route path='/' element={<Home />} />
        <Route path='/create-game' element={<CreateGame />} />
        <Route path='/create-account' element={<AccountCreate />} />
      </Routes>
    </div>
  );
}

export default App;
