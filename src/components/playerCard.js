import Card from "react-bootstrap/Card";

const PlayerCard = ({ player }) => {
   const { name, level, priority, gamesPlayed } = player;

   return (
      <Card className="player-card">
         <Card.Header>{name}</Card.Header>
         <Card.Body>
            <Card.Text>
               Level: {level} <br />
               Rounds Waited: {priority} <br />
               Games Played: {gamesPlayed} <br />
            </Card.Text>
         </Card.Body>
      </Card>
   );
};

export default PlayerCard;
