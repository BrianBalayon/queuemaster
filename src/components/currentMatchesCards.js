import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import ListGroup from "react-bootstrap/ListGroup";

const CurrentMatchesCard = ({ currentMatches }) => {
   const courts = ["Court 1", "Court 2", "court 3"];

   console.log(currentMatches)
   return (
      <CardGroup key={JSON.stringify(currentMatches)}>
         {currentMatches.map((match, index) => (
            <Card key={JSON.stringify(match)}>
               <Card.Header>{courts[index]}</Card.Header>
               <Card.Body>
                  <ListGroup variant="flush">
                     {match.map((player) => (
                        <ListGroup.Item key={player.name}>{player.name}</ListGroup.Item>
                     ))}
                  </ListGroup>
               </Card.Body>
            </Card>
         ))}
      </CardGroup>
   );
};

export default CurrentMatchesCard;
