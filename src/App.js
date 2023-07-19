import React from 'react';
import './App.css';
import Popup from 'reactjs-popup';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom';
import CreateGame from './components/CreateGame.js'

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
