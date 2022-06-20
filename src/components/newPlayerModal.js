import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const NewPlayerModal = ({ isOpen, handleClose, handleAddPlayer }) => {
   const [name, setName] = useState("");
   const [level, setLevel] = useState(0);

   const handleChangeName = (event) => {
      const name = event.target.value;
      setName(name);
   };

   const handleChangeLevel = (event) => {
      const level = event.target.value;
      setLevel(level);
   };

   const handleConfirmPlayer = () => {
      handleAddPlayer(name, level);
      handleClose();
   };

   return (
      <Modal show={isOpen} onHide={handleClose}>
         <Modal.Header closeButton>
            <Modal.Title>Add Player</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form>
               <Form.Group>
                  <Form.Label>Player Name</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter player name"
                     onChange={handleChangeName}
                  />
               </Form.Group>
               <Form.Group>
                  <Form.Label>Player Level</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Enter number"
                     onChange={handleChangeLevel}
                  />
                  <Form.Text className="text-muted">
                     On a scale from 1 to 8, where 1 = beginner and 8 = expert.
                  </Form.Text>
               </Form.Group>
            </Form>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={handleConfirmPlayer}>
               Add Player
            </Button>
            <Button variant="outline-secondary" onClick={handleClose}>
               Cancel
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default NewPlayerModal;
