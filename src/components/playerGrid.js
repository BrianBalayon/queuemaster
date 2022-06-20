import PlayerCard from "./playerCard";
import { Row, Col, Accordion } from "react-bootstrap";

const PlayerGrid = ({ players }) => {
   return (
      <Accordion className="player-card">
         <Accordion.Item eventKey="0">
            <Accordion.Header>Players</Accordion.Header>
            <Accordion.Body>
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
            </Accordion.Body>
         </Accordion.Item>
      </Accordion>
   );
};

export default PlayerGrid;
