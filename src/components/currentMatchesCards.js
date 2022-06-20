import { Card, Col, Row, ListGroup } from "react-bootstrap";

const CurrentMatchesCard = ({ currentMatches }) => {
   return (
      <Row xs={2} md={3} lg={7} key={JSON.stringify(currentMatches)}>
         {currentMatches.map((match, index) => (
            <Col key={JSON.stringify(match) + index}>
               <Card className="player-card">
                  <Card.Header>Court {index + 1}</Card.Header>
                  <Card.Body>
                     <ListGroup variant="flush">
                        {match.map((player) => (
                           <ListGroup.Item key={player.name}>
                              {player.name}
                           </ListGroup.Item>
                        ))}
                     </ListGroup>
                  </Card.Body>
               </Card>
            </Col>
         ))}
      </Row>
   );
};

export default CurrentMatchesCard;
