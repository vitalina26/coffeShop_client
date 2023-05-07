import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import React from "react"
import { OrderItem } from '../../models/OrderItem';

const Order_item = (props: { item :OrderItem }) => {

  return (
    <Card style={{ width: '10rem' }}>
      <Card.Img variant="top" src={props.item.coffe_id.img_url} />
      <Card.Body>
        <Card.Header> {props.item.coffe_id.name} </Card.Header>
        <ListGroup className="list-group-flush">
        <ListGroup.Item>Price: {props.item.price}₴ </ListGroup.Item> 
        <ListGroup.Item>Quantity: {props.item.quantity}</ListGroup.Item>             
        </ListGroup>  
        </Card.Body>
    </Card>
  );
  }
  
export default Order_item;