import "./App.css";
import { useState } from "react";
import { getAllGroups } from "./logic/generateQueue";
import { TEST_PLAYERS } from "./constants/testPlayers";
import PlayerGrid from "./components/playerGrid";
import CurrentMatchesCard from "./components/currentMatchesCards";
import QueueControls from "./components/queueControls";
import NewPlayerModal from "./components/newPlayerModal";
import RemovePlayerModal from "./components/removePlayerModal";
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
   const [playedMatches, setPlayedMatches] = useState([]);
   const [isNewPlayerModalOpen, setNewPlayerModalOpen] = useState(false);
   const [isRemovePlayerModalOpen, setRemovePlayerModalOpen] = useState(false);

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

   const handleChangeNumCourts = (newNum) => {
      if (newNum < currentMatches.length)
         setCurrentMatches(currentMatches.slice(0, newNum));
      else setCurrentMatches([...currentMatches, []]);
      setNumCourts(newNum);
   };

   const handleChangePlayers = (players) => {
      setPlayers(players);
      const newMatches = getAllGroups(players);
      const newQueue = sortByPriority(newMatches);
      setMatches(newQueue);
   }

   const handleAddPlayer = (name, level) => {
      const newPlayer = {
         name,
         level,
         priority: 0,
         gamesPlayed: 0,
      };
      const newPlayerList = [...players, newPlayer];
      handleChangePlayers(newPlayerList)
   };

   const handleRemovePlayer = (toRemove) => {
      console.log(toRemove)
      const toSet = [...players];
      const playerIndex = toSet.findIndex(
         (player) =>
            player.name === toRemove.name && player.level === toRemove.level
      );
      toSet.splice(playerIndex, 1);
      handleChangePlayers(toSet)
   };

   const handleOpenNewPlayerModal = () => {
      setNewPlayerModalOpen(true);
   };

   const handleCloseNewPlayerModal = () => {
      setNewPlayerModalOpen(false);
   };

   const handleOpenRemovePlayerModal = () => {
      setRemovePlayerModalOpen(true);
   };

   const handleCloseRemovePlayerModal = () => {
      setRemovePlayerModalOpen(false);
   };

   return (
      <div className="app">
         <CurrentMatchesCard
            currentMatches={currentMatches}
            numCourts={numCourts}
         />
         <QueueControls
            numCourts={numCourts}
            handleNextGame={handleNextGame}
            setNumCourts={handleChangeNumCourts}
            handleOpenNewPlayerModal={handleOpenNewPlayerModal}
            handleOpenRemovePlayerModal={handleOpenRemovePlayerModal}
         />
         <NewPlayerModal
            isOpen={isNewPlayerModalOpen}
            handleClose={handleCloseNewPlayerModal}
            handleAddPlayer={handleAddPlayer}
         />
         <RemovePlayerModal
            isOpen={isRemovePlayerModalOpen}
            players={players}
            handleClose={handleCloseRemovePlayerModal}
            handleRemovePlayer={handleRemovePlayer}
         />
         <PlayerGrid players={players} />
      </div>
   );
}

export default App;
