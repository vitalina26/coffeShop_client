import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import React, { SyntheticEvent}  from "react"
import MyVerticallyCenteredModal from '../CS-modal/CS-modal';
import { deleteCoffe, getCoffe } from '../../store/slices/coffe-slice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import {  useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/NavLink';
import styled from 'styled-components';
import { Coffe } from '../../models/Coffe';
import { addToCart } from '../../store/slices/cart-slice/cart-slice';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';
import { StyledButton, StyledNavLink } from './CS-coffe.style';
const CoffeItem = (props: { coffe: Coffe, role: string }) => {
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch()
  const [modalShow, setModalShow] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const deleteHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(deleteCoffe(props.coffe.id))
  
  }
  const editHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(getCoffe(props.coffe.id));
    navigate(`/coffeform/edit/${props.coffe.id}/`)
   
  }
  const addToCartHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(addToCart({ coffe_id: props.coffe.id, price: props.coffe.price}));
    setShow(true);
   
  }


  return (
    <Card style={{ width: '13rem' }}>
      <Card.Img variant="top" src={props.coffe.img_url} />
      <Card.Body>
        <StyledNavLink onClick={() => setModalShow(true)}> {props.coffe.name} </StyledNavLink>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Price: {props.coffe.price}₴ <br/> Weight: 250g</ListGroup.Item>        
        </ListGroup>
        {props.role === 'admin' ?
            (<>
              <StyledButton variant="light" onClick={deleteHandler}>Delete</StyledButton>
              <StyledButton variant="light" onClick={editHandler}>Edit</StyledButton>
            </>
            ) : props.role === 'user' ?
            (
                <StyledButton variant="light"  onClick={addToCartHandler}>Add to Cart</StyledButton>                   
            ) : <></>          
        }        
        </Card.Body>
      {show && <ToastContainer className="p-4" position='middle-end'>
        <Toast bg='primary' onClose={() => setShow(false)} show={show} delay={2000} autohide>
          <Toast.Body>Coffe added to cart</Toast.Body>
        </Toast>
      </ToastContainer>}
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        coffe={props.coffe}
      />    
    </Card>
  );
  }
  
export default CoffeItem;