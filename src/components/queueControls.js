import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

const QueueControls = ({
   numCourts,
   setNumCourts,
   handleNextGame,
   handleOpenNewPlayerModal,
   handleOpenRemovePlayerModal,
}) => {
   let nextMatchButtons = [];
   for (let index = 0; index < numCourts; index += 1) {
      const buttonHandler = () => handleNextGame(index);
      nextMatchButtons.push(
         <Button key={index} variant="primary" onClick={buttonHandler}>
            {index === 0 ? "Next Game" : ""} Court {index + 1}
         </Button>
      );
   }

   return (
      <div className='queue-control-panel'>
         <ButtonGroup className='queue-control-btn-group'>{nextMatchButtons}</ButtonGroup>
         <ButtonGroup className='queue-control-btn-group'>
            <Button
               variant="primary"
               onClick={() => setNumCourts(numCourts + 1)}>
               Add Court
            </Button>
            <Button
               variant="primary"
               onClick={() => setNumCourts(numCourts - 1)}>
               Remove Court
            </Button>
         </ButtonGroup>
         <ButtonGroup className='queue-control-btn-group'>
            <Button variant="primary" onClick={handleOpenNewPlayerModal}>
               Add Player
            </Button>
            <Button variant="primary" onClick={handleOpenRemovePlayerModal}>
               Remove Player
            </Button>
         </ButtonGroup>
      </div>
   );
};

export default QueueControls;
