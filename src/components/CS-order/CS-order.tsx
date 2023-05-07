import React, {  useState } from "react"
import { Order } from "../../models/Order";
import { Button, Container, Form } from "react-bootstrap";
import { ContainerOfCoffe } from "../../pages/Home";
import Order_item from "../CS-order-item/CS-order-item";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { updateOrderStatus } from "../../slices/orders-slice";
import styled from "styled-components";
const OrdersItem = (props: { order: Order, isAdmin: boolean}) => {
const dispatch = useAppDispatch()
const [orderStatus, setOrderStatus] = useState(props.order.status)    
const [showItems, setShowItems] = useState(false)
const createOrderHandler = (e: any) => {
    e.preventDefault();
    setOrderStatus(e.target.value)
    dispatch(updateOrderStatus({id: props.order.id, stutus: e.target.value}));
}
const ContainerOfOrder = styled(Container)`
    border: solid white;
    margin: 10px 0px;
    padding: 10px;

`
const dt = new Date(props.order.date)    
return (
    <ContainerOfOrder>
        <h5>Data: {dt.toLocaleString("en-US", { hour12: false })}</h5>
        <h5> Total order price: {props.order.total_price}₴</h5>
        <h5> Status: {orderStatus}</h5>
    {props.isAdmin && <>
        <h5>User Name: {`${ props.order.user_id.firstname } ${ props.order.user_id.secondname }`}</h5>
        <h5>Phonenumber: {props.order.user_id.phonenumber}</h5>    
        <Form.Label>Change status</Form.Label>
        <Form.Select className="w-25" aria-label="Default select example" value={orderStatus}
            onChange={createOrderHandler}>
            <option value="processing">Processing</option>
            <option value="framed">Framed</option>
            <option value="sent">Sent</option>
            <option value="delivered">Delivered</option>
            <option value="canceled">Canceled</option>
         </Form.Select>    
     </>}    
    <Button variant="primary" onClick={() => setShowItems((prev) => (!prev))} className='my-3'>{!showItems ? 'Show Items' : 'Hide Items'}</Button>   
{showItems&&<ContainerOfCoffe>
        {props.order.items.length > 0 &&
            props.order.items.map((item) => (
                <Order_item key={item.id} item={item} />
        ))}
    </ContainerOfCoffe>}

    </ContainerOfOrder>
    

  )
  }
  
export default OrdersItem;