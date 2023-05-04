import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import React, { SyntheticEvent, useEffect }  from "react"
import MyVerticallyCenteredModal from '../CS-modal/CS-modal';
import { deleteCoffe, getCoffe } from '../../slices/coffe-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import {  useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/NavLink';
import styled from 'styled-components';
import { reset } from '../../slices/auth-slice';
import { Coffe } from '../../models/Coffe';
const CoffeItem = (props: { coffe: Coffe, role: string }) => {
  console.log(props.coffe.id)
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch()
  const { coffe } = useAppSelector((state) => state.coffe)
  const [modalShow, setModalShow] = React.useState(false);

  const deleteHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(deleteCoffe(props.coffe.id))
    window.location.reload();
  }
  const editHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    await dispatch(getCoffe(props.coffe.id));
    navigate(`/coffeform/edit/${props.coffe.id}/`)
   
  }
 /* useEffect(() => {
    console.log(props.coffe.id)
    dispatch(getCoffe(props.coffe_id))
  }, [])*/
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
                <StyledButton variant="light">Add to Cart</StyledButton>                   
            ) : <></>          
        }        
        </Card.Body>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        coffe={props.coffe}
      />    
    </Card>
  );
  }
  
export default CoffeItem;