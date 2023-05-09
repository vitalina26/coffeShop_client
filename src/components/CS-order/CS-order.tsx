import React, {  useState } from "react"
import { Order } from "../../models/Order";
import { Button, Col, Form, Row } from "react-bootstrap";
import Order_item from "../CS-order-item/CS-order-item";
import { useAppDispatch } from "../../hooks/redux-hooks";
import { updateOrderStatus } from "../../slices/orders-slice";
import { ContainerOfOrder, StyledH5, StyledLabel } from "./CS-styled-order";
import { ContainerOfCoffe } from "../../pages/Home/styledHome";

const OrdersItem = (props: { order: Order, isAdmin: boolean}) => {
const dispatch = useAppDispatch()
const [orderStatus, setOrderStatus] = useState(props.order.status)    
const [showItems, setShowItems] = useState(false)
const createOrderHandler = (e: any) => {
    e.preventDefault();
    setOrderStatus(e.target.value)
    dispatch(updateOrderStatus({id: props.order.id, stutus: e.target.value}));
}

const dt = new Date(props.order.date)    
return (
    <ContainerOfOrder>
        <Row>
            <Col lg={8} >
            <h5> Status: <span style={{ color: "#2a9fd6", fontWeight: 'bold'}}>{orderStatus}</span></h5>
            {props.isAdmin && <>
                <StyledLabel>Change status</StyledLabel>
                <Form.Select className="w-25" aria-label="Default select example" value={orderStatus}
                    onChange={createOrderHandler}>
                    <option value="processing">Processing</option>
                    <option value="framed">Framed</option>
                    <option value="sent">Sent</option>
                    <option value="delivered">Delivered</option>
                    <option value="canceled">Canceled</option>
                </Form.Select></> }    
                <Button variant="primary" onClick={() => setShowItems((prev) => (!prev))} className='my-3'>{!showItems ? 'Show Items' : 'Hide Items'}</Button>   
            {showItems&&<ContainerOfCoffe>
                        {props.order.items.length > 0 &&
                            props.order.items.map((item) => (
                                <Order_item key={item.id} item={item} />
                        ))}
                    </ContainerOfCoffe>}
            </Col>

            <Col lg={4} >
                <StyledH5>Data: {dt.toLocaleString("en-US", { hour12: false })}</StyledH5>
                <StyledH5> Total order price:  <span style={{ color: "#2a9fd6", fontWeight: 'bold'}}>{props.order.total_price}₴</span></StyledH5>
            {props.isAdmin && <>
                <StyledH5>User Name: {`${ props.order.user_id.firstname } ${ props.order.user_id.secondname }`}</StyledH5>
                <StyledH5>Phonenumber: {props.order.user_id.phonenumber}</StyledH5>    
            </>}    

            </Col>
        </Row>
       

    </ContainerOfOrder>
    

  )
  }
  
export default OrdersItem;