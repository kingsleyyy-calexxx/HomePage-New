import React from 'react';
import './App.css';
import Main from './Components/Main';
import TileGrid from './Components/TileGrid';
import FlipCard from './Components/FlipCard';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import WordGame from './Components/WordGame';
import Add from './Components/Add'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' Component={Main} />
          <Route path='/flipcard' Component={FlipCard} />
          <Route path = '/shuffle' Component={WordGame}/>
          <Route path = '/randadd' Component={Add}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
