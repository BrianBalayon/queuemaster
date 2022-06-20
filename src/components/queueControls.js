import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

const QueueControls = ({ numCourts, handleNextGame }) => {
   let nextMatchButtons = [];
   for (let index = 0; index < numCourts; index += 1) {
      const buttonHandler = () => handleNextGame(index);
      nextMatchButtons.push(
         <Button
            key={index}
            className={"next-game-btn"}
            variant="primary"
            onClick={buttonHandler}>
            Next Game Court {index + 1}
         </Button>
      );
   }

   return (
      <ButtonToolbar>
         <ButtonGroup>{nextMatchButtons}</ButtonGroup>
      </ButtonToolbar>
   );
};

export default QueueControls;
