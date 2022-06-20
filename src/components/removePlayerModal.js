import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { alphabeticalPlayers } from "../logic/utils";

const RemovePlayerModal = ({
   isOpen,
   players = [],
   handleClose,
   handleRemovePlayer,
}) => {
   const playersAlhpabetical = alphabeticalPlayers(players);

   const [player, setPlayer] = useState(playersAlhpabetical[0]);
   const [isVerified, setVerified] = useState(false);

   const handleSelectPlayer = (event) => {
      const selected = JSON.parse(event.target.value);
      setPlayer(selected);
      setVerified(false);
   };

   const handleConfirmPlayer = () => {
      if (!isVerified) setVerified(true);
      else {
         handleRemovePlayer(player);
         handleClose();
         setVerified(false);
      }
   };

   const playerOptions = playersAlhpabetical.map((player) => (
      <option value={JSON.stringify(player)} key={JSON.stringify(player)}>
         {player.name} ({player.level})
      </option>
   ));

   return (
      <Modal show={isOpen} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Remove Player</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form.Group className="mb-3">
               <Form.Label>Player to Remove</Form.Label>
               <Form.Select onChange={handleSelectPlayer}>
                  {playerOptions}
               </Form.Select>
            </Form.Group>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={handleConfirmPlayer}>
               {isVerified ? "Remove Player" : "Click to Confirm"}
            </Button>
            <Button variant="outline-secondary" onClick={handleClose}>
               Cancel
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default RemovePlayerModal;
