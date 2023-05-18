import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import React, { SyntheticEvent, useEffect,useState}  from "react"
import MyVerticallyCenteredModal from '../CS-modal/CS-modal';
import { getCoffe } from '../../store/slices/coffe-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { decrementQuantity, incrementQuantity, removeItem } from '../../store/slices/cart-slice/cart-slice';
import { CoffeIdAndQuantity } from '../../dto/OrderDto';
import { StyledButton, StyledNavLink } from './CS-cart-item.style';
import { Coffe } from '../../models/Coffe';

const CartItem = (props:  CoffeIdAndQuantity ) => {
  const dispatch  = useAppDispatch()
  const [modalShow, setModalShow] = useState(false);
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
    
    

  return (
    <Card style={{ width: '12rem' }}>
      <Card.Img variant="top" src={img_url} />
      <Card.Body>
        <StyledNavLink onClick={() => setModalShow(true)}> {name} </StyledNavLink>
        <ListGroup className="list-group-flush">
        <ListGroup.Item>Total price: {price * props.quantity}₴ </ListGroup.Item>        
        </ListGroup>
        <StyledButton variant="light" onClick={incrementQuantityHandler}>+</StyledButton>{props.quantity}<StyledButton variant="light" onClick={decrementQuantityHandler}>-</StyledButton>
        <StyledButton variant="light"  onClick={removeHandler}>Remove Item</StyledButton>                   
        </Card.Body>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        coffe={{ name, price,description,beansClass,country,degreeOfRoasting,processingType ,img_url,cookingMethod}}
      />    
    </Card>
  );
  }
  
export default CartItem;