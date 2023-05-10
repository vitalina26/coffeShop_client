import React, { SyntheticEvent, useEffect } from "react"
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { useNavigate } from "react-router-dom"
import { Button, Container } from "react-bootstrap";
import { ContainerOfCoffe } from "../Home/Home.style";
import CartItem from "../../components/CS-cart-item/CS-cart-item";
import { createOrder, getItems, resetCart } from "../../store/slices/cart-slice";
import { ContainerOfButtons, MainHeader, PticeHeader } from "./Cart.style";

const Cart = () => {
  const navigate  = useNavigate();
  const dispatch = useAppDispatch()
  const { items, counter}  = useAppSelector((state) => state.cart)
  console.log(items)
  useEffect(() => {
    dispatch((getItems()))
  }, [])

  const createOrderHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(createOrder({ items }));
    navigate('/orderhistory')
    window.location.reload();
  }
  const cancelOrderHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetCart());
    }

  return (
      <Container>
      <MainHeader>My Cart {items.length==0 && 'is empty now =('}</MainHeader>
      <ContainerOfCoffe>
      {items.length > 0 &&
          items.map((cart_item) => (
            <CartItem key={cart_item.coffe_id} coffe_id={cart_item.coffe_id} quantity={cart_item.quantity} />
          ))}
      </ContainerOfCoffe>
      {items.length > 0 && <PticeHeader> Total order price: { counter}₴</PticeHeader>}
      {items.length > 0 && <ContainerOfButtons>
        <Button variant="primary" onClick={createOrderHandler} className='my-3'>Create order</Button>
        <Button variant="light" onClick={cancelOrderHandler} className='my-3'>Cancel order</Button>
      </ContainerOfButtons>}
      </Container>
      

    )
  }
  
  export default Cart