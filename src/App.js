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
import { alphabeticalPlayers } from "./logic/utils";
import { Button } from "react-bootstrap";

function App() {
   const [currentMatches, setCurrentMatches] = useState([[], []]);
   const [numCourts, setNumCourts] = useState(2);
   const [players, setPlayers] = useState([]);
   const [queue, setMatches] = useState([]);
   const [playedMatches, setPlayedMatches] = useState({});
   const [isNewPlayerModalOpen, setNewPlayerModalOpen] = useState(false);
   const [isRemovePlayerModalOpen, setRemovePlayerModalOpen] = useState(false);
   const [isDemoAvailable, setIsDemoAvailable] = useState(true);

   const areAllPlayersFree = (currentMatches, next) => {
      for (let playerIndex = 0; playerIndex < next.length; playerIndex += 1) {
         const { name } = next[playerIndex];
         if (isPlayerMidgame(currentMatches, name)) return false;
      }
      return true;
   };

   const getMatchKey = (match) => {
      const players = alphabeticalPlayers(match);
      const key = [];
      players.forEach((player) => {
         const { name, level } = player;
         key.push({ name, level });
      });
      return JSON.stringify(key);
   };

   const handleRecordMatch = (match) => {
      if (match.length === 0) return;
      const matchKey = getMatchKey(match);
      const data = {
         players: match,
         timestamp: new Date(),
      };
      const toRecord = { ...playedMatches, [matchKey]: data };
      setPlayedMatches(toRecord);
      console.log(Object.keys(toRecord), toRecord);
   };

   const wasMatchPlayed = (match) => {
      const matchKey = getMatchKey(match);
      return playedMatches.hasOwnProperty(matchKey);
   };

   const handleNextGame = (matchIndex) => {
      const newPlayerPriorities = increasePriority(
         players,
         currentMatches.flat()
      );
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
      while (
         wasMatchPlayed(newQueue[nextMatchIndex]) ||
         !areAllPlayersFree(currentMatches, newQueue[nextMatchIndex])
      ) {
         nextMatchIndex += 1;
      }
      let newCurrentMatches = [...currentMatches];
      handleRecordMatch(newQueue[nextMatchIndex]);
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
   };

   const handleAddPlayer = (name, level) => {
      const newPlayer = {
         name,
         level,
         priority: 0,
         gamesPlayed: 0,
      };
      const newPlayerList = [...players, newPlayer];
      handleChangePlayers(newPlayerList);
   };

   const handleRemovePlayer = (toRemove) => {
      const toSet = [...players];
      const playerIndex = toSet.findIndex(
         (player) =>
            player.name === toRemove.name && player.level === toRemove.level
      );
      toSet.splice(playerIndex, 1);
      handleChangePlayers(toSet);
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

   const handleAddTestPlayers = () => {
      const allPlayers = [...TEST_PLAYERS];
      const allMatches = getAllGroups(allPlayers);
      setPlayers(allPlayers);
      setMatches(allMatches);
      setIsDemoAvailable(false);
      alert(
         'Demo players have been loaded. Open "Players" tab to view. You may use the app as normal.'
      );
   };

   return (
      <div className="app">
         <h1 className="text-center">Q Master</h1>
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
         <PlayerGrid players={players} playedMatches={playedMatches} />
         {isDemoAvailable && (
            <Button
               variant="warning"
               className="full-width-btn"
               onClick={handleAddTestPlayers}>
               Start Demo Mode
            </Button>
         )}
      </div>
   );
}

export default App;
