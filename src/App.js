import React from 'react';
import './App.css';
import Popup from 'reactjs-popup';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Home/>
      <header className="App-header">
        <div>
          <Popup trigger=
              {<button> Click to open popup </button>}
              position="right center">
              <div>GeeksforGeeks</div>
              <button onClick={async () => {
                return await fetch('http://localhost:8080/get-cookie')
                  .then(data => console.log(data))
              }}>Click here</button>
          </Popup>
        </div>
      </header>
    </div>
  );
}

export default App;
