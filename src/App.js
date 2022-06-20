import "./App.css";
import { useState } from "react";
import { getAllGroups } from "./logic/generateQueue";
import { TEST_PLAYERS } from "./constants/testPlayers";
import PlayerGrid from "./components/playerGrid";
import CurrentMatchesCard from "./components/currentMatchesCards";
import QueueControls from "./components/queueControls";
import {
   increasePriority,
   sortByPriority,
   resetPriority,
   isPlayerMidgame,
} from "./logic/updateQueue";

function App() {
   const allPlayers = [...TEST_PLAYERS];
   const allMatches = getAllGroups(allPlayers);

   const [currentMatches, setCurrentMatches] = useState([[], [], []]);
   const [numCourts, setNumCourts] = useState(3);
   const [players, setPlayers] = useState(allPlayers);
   const [queue, setMatches] = useState(allMatches);

   const areAllPlayersFree = (currentMatches, next) => {
      for (let playerIndex = 0; playerIndex < next.length; playerIndex += 1) {
         const { name } = next[playerIndex];
         if (isPlayerMidgame(currentMatches, name)) return false;
      }
      return true;
   };

   const handleNextGame = (matchIndex) => {
      const newPlayerPriorities = increasePriority(allPlayers);
      currentMatches[matchIndex].forEach((player) =>
         resetPriority(newPlayerPriorities, player.name)
      );
      newPlayerPriorities.sort(
         (lower, higher) => higher.priority - lower.priority
      );
      setPlayers(newPlayerPriorities);
      const newQueue = sortByPriority(queue);
      setMatches(newQueue);
      let nextMatchIndex = 0;
      while (!areAllPlayersFree(currentMatches, newQueue[nextMatchIndex])) {
         nextMatchIndex += 1;
      }
      let newCurrentMatches = [...currentMatches];
      newCurrentMatches[matchIndex] = newQueue[nextMatchIndex];
      setCurrentMatches(newCurrentMatches);
   };

   const constHandleChangeNumCourts = (newNum) => {
    if (newNum<currentMatches.length) setCurrentMatches(currentMatches.slice(0, newNum));
    else setCurrentMatches([...currentMatches, []])
    setNumCourts(newNum);
   }

   return (
      <div className="app">
         <CurrentMatchesCard currentMatches={currentMatches} numCourts={numCourts} />
         <QueueControls
            numCourts={numCourts}
            handleNextGame={handleNextGame}
            setNumCourts={constHandleChangeNumCourts}
         />
         <PlayerGrid players={players} />
      </div>
   );
}

export default App;
