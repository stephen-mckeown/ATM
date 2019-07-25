import React from 'react';
import './App.css';
import ControlPad from './components/ControlPad.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ATM APP</h1>
        <ControlPad/>
      </header>
    </div>
  );
}

export default App;
