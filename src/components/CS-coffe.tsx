import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import React, { SyntheticEvent, useEffect }  from "react"
import MyVerticallyCenteredModal from './CS-modal';
import { Coffe } from '../models/Coffe';
import { deleteCoffe, getCoffe } from '../slices/coffe-slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { useNavigate } from "react-router-dom";
  
const CoffeItem = (props: { coffe_id: string, role: string }) => {
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch()
  const { coffe } = useAppSelector((state) => state.coffe)
  const [modalShow, setModalShow] = React.useState(false);

  const deleteHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(deleteCoffe(props.coffe_id))
  }
  const editHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(`/coffeform/edit/${props.coffe_id}/`)
  }
  useEffect(() => {
    dispatch(getCoffe(props.coffe_id))
  }, [])
  
  return (
    <Card>
      <Card.Body>
        <Card.Link onClick={() => setModalShow(true)}> {coffe.name} </Card.Link>
        <Card.Text>
        {coffe.description}
        </Card.Text>
        <ListGroup className="list-group-flush">
            <ListGroup.Item>Price: {coffe.price}₴ | weight: 250g</ListGroup.Item>        
        </ListGroup>
        {props.role === 'admin' ?
            (<>
              <Button variant="light" onClick={deleteHandler}>Delete</Button>
              <Button variant="light" onClick={editHandler}>Edit</Button>
            </>
            ) : props.role === 'user' ?
            (
                <Button variant="light">Add to Cart</Button>                   
            ) : <></>          
        }        
        </Card.Body>
        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        coffe={coffe}
      />    
    </Card>
  );
  }
  
export default CoffeItem;