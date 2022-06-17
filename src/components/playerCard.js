import Card from "react-bootstrap/Card";

const PlayerCard = ({ player }) => {
   const { name, level, priority } = player;

   return (
      <Card className="player-card" border="dark">
         <Card.Header>{name}</Card.Header>
         <Card.Body>
            <Card.Text>
               Level: {level} |
               Priority: {priority}
            </Card.Text>
         </Card.Body>
      </Card>
   );
};

export default PlayerCard;
