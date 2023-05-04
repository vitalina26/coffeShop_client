import React, { SyntheticEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { useNavigate } from "react-router-dom"
import { Button, Container } from "react-bootstrap";
import styled from "styled-components";
import { ContainerOfCoffe } from "./Home";
import CartItem from "../components/CS-cart-item/CS-cart-item";
import { createOrder, getItems, resetCart } from "../slices/cart-slice";

const Cart = () => {
  const navigate  = useNavigate();
  const dispatch = useAppDispatch()
  const { items } = useAppSelector((state) => state.cart)
  console.log(items)
  useEffect(() => {
    dispatch((getItems()))
  }, [])

  const createOrderHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(createOrder({ items }));
  }
  const orderHistoryHandler = (e: SyntheticEvent) => {
    e.preventDefault();
 //   dispatch((items));
  }
  const cancelOrderHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetCart());
    }
  const ContainerOfButtons = styled.div`
    display: flex;
   // justify-content: end ;
    gap:15px;
    flex-wrap: wrap;
    padding-left:30px;
    margin: 0px auto;
    /* background: white; */
`  
 const MainHeader = styled.h2`
 padding:30px;
  `  
  return (
      <Container>
      <MainHeader>My Cart</MainHeader>
      <ContainerOfButtons>
        <Button variant="light" onClick={orderHistoryHandler} className='my-3'>Order history</Button>
      </ContainerOfButtons>
      <ContainerOfCoffe>
      {items.length > 0 &&
          items.map((cart_item) => (
            <CartItem key={cart_item.coffe_id} coffe_id={cart_item.coffe_id} quantity={cart_item.quantity} />
          ))}
      </ContainerOfCoffe>
      <ContainerOfButtons>
        <Button variant="primary" onClick={createOrderHandler} className='my-3'>Create order</Button>
        <Button variant="light" onClick={cancelOrderHandler} className='my-3'>Cancel order</Button>
      </ContainerOfButtons>
      </Container>
      

    )
  }
  
  export default Cart