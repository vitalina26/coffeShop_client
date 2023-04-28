import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import React from "react"
import Modal from 'react-bootstrap/Modal';
import { CoffeDto } from '../dto/CoffeDto';

const MyVerticallyCenteredModal = (props: {show: boolean,onHide: () => void, coffe: CoffeDto}) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {props.coffe.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Description</h5>
          <p>{props.coffe.description}</p>
        </Modal.Body>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>{props.coffe.description}</ListGroup.Item>
            <ListGroup.Item>Cooking method: {props.coffe.cookingMethod}</ListGroup.Item>
            <ListGroup.Item>Degree of Roasting: {props.coffe.degreeOfRoasting}</ListGroup.Item>
            <ListGroup.Item>Processing Type: {props.coffe.processingType}</ListGroup.Item>
            <ListGroup.Item>Country: {props.coffe.country}</ListGroup.Item>
            <ListGroup.Item>Price: {props.coffe.price}₴ | weight: 250g</ListGroup.Item>        
        </ListGroup>
        <Modal.Footer>
          <Button variant="light" onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
}
export default MyVerticallyCenteredModal;