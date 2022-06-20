import PlayerCard from "./playerCard";
import { Row, Col, Accordion, Table } from "react-bootstrap";

const PlayerGrid = ({ players, playedMatches }) => {
   const matchesByTime = Object.values(playedMatches).sort(
      (prev, next) => next.timestamp - prev.timestamp
   );

   const getListOfNames = (players) => {
      const names = players.map((player) => player.name);
      return names.join(", ");
   };

   const getMatchTime = (date = new Date()) => {
      try {
         return date.toLocaleTimeString();
      } catch (error) {
         return "";
      }
   };

   return (
      <Accordion className="player-card">
         <Accordion.Item eventKey="0">
            <Accordion.Header>Players</Accordion.Header>
            <Accordion.Body>
               <Row xs={2} md={3} lg={5}>
                  {players.map((player) => (
                     <Col key={JSON.stringify(player)}>
                        <PlayerCard
                           key={`${player.name}${player.priority}`}
                           player={player}
                        />
                     </Col>
                  ))}
               </Row>
            </Accordion.Body>
         </Accordion.Item>
         <Accordion.Item eventKey="1">
            <Accordion.Header>Played Matches</Accordion.Header>
            <Accordion.Body>
               <Table striped hover>
                  <thead>
                     <tr>
                        <th>Time</th>
                        <th>Players</th>
                     </tr>
                  </thead>
                  <tbody>
                     {matchesByTime.map((match) => (
                        <tr key={JSON.stringify(match)}>
                           <td>{getMatchTime(match.timestamp)}</td>
                           <td>{getListOfNames(match.players)}</td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
            </Accordion.Body>
         </Accordion.Item>
      </Accordion>
   );
};

export default PlayerGrid;
