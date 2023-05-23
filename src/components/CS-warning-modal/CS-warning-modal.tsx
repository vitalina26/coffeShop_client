import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import React from "react"
import Modal from 'react-bootstrap/Modal';
import { CoffeDto } from '../../dto/CoffeDto';

const WarningModal= (props: { show: boolean, onHide: () => void }) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Warning message
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>User with such email as you entered has already exist</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
export default WarningModal;