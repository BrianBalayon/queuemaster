import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import PlayerCard from "./playerCard";
import { Button } from "react-bootstrap";
import {
   increasePriority,
   sortByPriority,
   resetPriority,
} from "../logic/updateQueue";

const PlayerGrid = ({
   allPlayers,
   allMatches,
   currentMatches,
   setCurrentMatches,
}) => {
   const [players, setPlayers] = useState(allPlayers);
   const [matches, setMatches] = useState(allMatches);

   const handleNextGame = (matchIndex) => {
      const newPlayerPriorities = increasePriority(allPlayers);
      currentMatches[matchIndex].forEach((player) =>
         resetPriority(newPlayerPriorities, player.name)
      );
      setPlayers(newPlayerPriorities);
      const newQueue = sortByPriority(matches);
      setMatches(newQueue);
   };

   let buttons = [];
   for (let index = 0; index < currentMatches.length; index += 1) {
      const buttonHandler = () => handleNextGame(index);
      buttons.push(
         <Button className={"next-game-btn"} variant="primary" onClick={buttonHandler}>
            Next Game Court {index+1}
         </Button>
      );
   }

   return (
      <div>
         {buttons}
         <Row xs={1} md={2} lg={3}>
            {players.map((player) => (
               <Col>
                  <PlayerCard
                     key={`${player.name}${player.priority}`}
                     player={player}
                  />
               </Col>
            ))}
         </Row>
      </div>
   );
};

export default PlayerGrid;
