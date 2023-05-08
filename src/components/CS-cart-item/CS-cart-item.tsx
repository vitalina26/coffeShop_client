import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import React, { SyntheticEvent, useEffect}  from "react"
import MyVerticallyCenteredModal from '../CS-modal/CS-modal';
import { getCoffe } from '../../slices/coffe-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import Nav from 'react-bootstrap/NavLink';
import styled from 'styled-components';
import { decrementQuantity, incrementQuantity, removeItem } from '../../slices/cart-slice';
import { CoffeIdAndQuantity } from '../../dto/OrderDto';
import { StyledButton, StyledNavLink } from './CS-styled-cart-item';

const CartItem = (props:  CoffeIdAndQuantity ) => {
  const dispatch  = useAppDispatch()
  const [modalShow, setModalShow] = React.useState(false);
  const { coffe } = useAppSelector((state) => state.coffe)

    
  const removeHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(removeItem({ coffe_id: props.coffe_id, price: coffe.price * props.quantity}))
   
  }
  const incrementQuantityHandler = (e: SyntheticEvent) => {
    e.preventDefault();
     dispatch(incrementQuantity({ coffe_id: props.coffe_id, price: coffe.price}));
 }
  const decrementQuantityHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(decrementQuantity({ coffe_id: props.coffe_id, price: coffe.price}));
    }
    
  useEffect(() => {
    dispatch(getCoffe(props.coffe_id))
  }, [])
    
    

  return (
    <Card style={{ width: '12rem' }}>
      <Card.Img variant="top" src={coffe.img_url} />
      <Card.Body>
        <StyledNavLink onClick={() => setModalShow(true)}> {coffe.name} </StyledNavLink>
        <ListGroup className="list-group-flush">
        <ListGroup.Item>Total price: {coffe.price * props.quantity}₴ </ListGroup.Item>        
        </ListGroup>
        <StyledButton variant="light" onClick={incrementQuantityHandler}>+</StyledButton>{props.quantity}<StyledButton variant="light" onClick={decrementQuantityHandler}>-</StyledButton>
        <StyledButton variant="light"  onClick={removeHandler}>Remove Item</StyledButton>                   
        </Card.Body>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        coffe={coffe}
      />    
    </Card>
  );
  }
  
export default CartItem;