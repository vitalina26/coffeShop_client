import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import React, { SyntheticEvent, useEffect, useState}  from "react"
import MyVerticallyCenteredModal from '../CS-modal/CS-modal';
import { deleteCoffe, getCoffe } from '../../slices/coffe-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {  useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/NavLink';
import styled from 'styled-components';
import { Coffe } from '../../models/Coffe';
import { addToCart, decrementQuantity, incrementQuantity, removeItem } from '../../slices/cart-slice';
import { CoffeIdAndQuantity } from '../../dto/OrderDto';

const CartItem = (props:  CoffeIdAndQuantity ) => {
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch()
  const [modalShow, setModalShow] = React.useState(false);
  const { coffe } = useAppSelector((state) => state.coffe)
  const [name, setName] = useState(coffe.name)
  const [price, setPrice] = useState(coffe.price)
  const [description, setDescription] = useState(coffe.description)
  const [beansClass, setBeansClass] = useState(coffe.beansClass)
  const [country, setCountry] = useState(coffe.country)
  const [cookingMethod, setCookingMethod] = useState(coffe.cookingMethod)
  const [degreeOfRoasting, setDegreeOfRoasting] = useState(coffe.degreeOfRoasting)
  const [processingType, setProcessingType] = useState(coffe.processingType)
  const [img_url, setImgUrl] = useState(coffe.img_url)  
    
  const removeHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(removeItem(props.coffe_id))
   // window.location.reload();
  }
  const incrementQuantityHandler = (e: SyntheticEvent) => {
    e.preventDefault();
     dispatch(incrementQuantity(props.coffe_id));
 }
  const decrementQuantityHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(decrementQuantity(props.coffe_id));
    }
    
  useEffect(() => {
    dispatch(getCoffe(props.coffe_id)).then(
        (value) => {
        const temp_coffe = value.payload as Coffe;
        setName(temp_coffe.name);
        setPrice(temp_coffe.price);
        setDescription(temp_coffe.description);
        setBeansClass(temp_coffe.beansClass);
        setCountry(temp_coffe.country);
        setDegreeOfRoasting(temp_coffe.degreeOfRoasting);
        setProcessingType(temp_coffe.processingType);
        setImgUrl(temp_coffe.img_url);
        setCookingMethod(temp_coffe.cookingMethod);
         }
       )
  }, [])
    
    
    
  const StyledNavLink = styled(Nav) `     
    display: inline-block;
    color: white;
    margin:10px;

  &:hover:: after {
    width: 100 %;
  }
`
const StyledButton = styled(Button) `     
  margin:10px;
`

  return (
    <Card style={{ width: '15rem' }}>
      <Card.Img variant="top" src={img_url} />
      <Card.Body>
        <StyledNavLink onClick={() => setModalShow(true)}> {name} </StyledNavLink>
        <ListGroup className="list-group-flush">
        <ListGroup.Item>Price: {price * props.quantity}₴ </ListGroup.Item>        
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