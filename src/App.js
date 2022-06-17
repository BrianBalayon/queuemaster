import './App.css';
import { useState } from 'react';
import { getAllGroups } from "./logic/generateQueue";
import { TEST_PLAYERS } from './constants/testPlayers';
import PlayerGrid from "./components/playerGrid";
import CurrentMatchesCard from './components/currentMatchesCards';

function App() {

  const players = [...TEST_PLAYERS];
  const allMatches = getAllGroups(players);

  const [currentMatches, setCurrentMatches] = useState([[],[],[]]);
  const [numCourts, setNumCourts] = useState(3);

  return (
    <div className="app">
      <CurrentMatchesCard currentMatches={currentMatches} />
      <PlayerGrid 
        allPlayers={players}
        allMatches={allMatches} 
        currentMatches={currentMatches}
        setCurrentMatches={setCurrentMatches}
        numCourts={numCourts} />
    </div>
  );
}

export default App;
