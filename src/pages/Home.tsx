import React, { SyntheticEvent, useEffect } from "react"
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { useNavigate } from 'react-router-dom'
import { Button, Container} from "react-bootstrap";
import CoffeItem from "../components/CS-coffe";
import { getAllCoffes } from "../slices/coffes-slice";

const Home = () => {
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch()
  const { allCoffes } = useAppSelector((state) => state.coffes)
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const addHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    navigate(`/coffeform/create/new/`)
  }
  useEffect(() => {
    dispatch(getAllCoffes())
  }, [])
  return (
    <Container>
      <h1>Wellcome to the CoffeShop</h1>
      {isAuthenticated && user?.role === 'admin' && (
      <Button variant="light" onClick={addHandler} className='my-3'>
        Add New Coffe
      </Button>
      )}
      {allCoffes.length > 0 &&
          allCoffes.map((coffe_item) => (
            <CoffeItem key={coffe_item.id} coffe_id={coffe_item.id} role = {user ? user.role : 'none'} />
          ))}
    </Container>

    )
  }
  
  export default Home