import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

const QueueControls = ({ numCourts, setNumCourts, handleNextGame, handleOpenNewPlayerModal }) => {
   let nextMatchButtons = [];
   for (let index = 0; index < numCourts; index += 1) {
      const buttonHandler = () => handleNextGame(index);
      nextMatchButtons.push(
         <Button key={index} variant="primary" onClick={buttonHandler}>
            Next Game Court {index + 1}
         </Button>
      );
   }

   return (
      <ButtonToolbar>
         <ButtonGroup>{nextMatchButtons}</ButtonGroup>
         <ButtonGroup>
            <Button
               variant="primary"
               onClick={() => setNumCourts(numCourts+1)}>
               Add Court
            </Button>
            <Button
               variant="primary"
               onClick={() => setNumCourts(numCourts-1)}>
               Remove Court
            </Button>
         </ButtonGroup>
         <ButtonGroup>
            <Button
               variant="primary"
               onClick={handleOpenNewPlayerModal}>
               Add Player
            </Button>
            <Button
               variant="primary"
               onClick={() => setNumCourts(numCourts-1)}>
               Remove Player
            </Button>
         </ButtonGroup>
      </ButtonToolbar>
   );
};

export default QueueControls;
