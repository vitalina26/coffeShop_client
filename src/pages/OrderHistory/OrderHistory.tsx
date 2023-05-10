import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { getAllUserOrders } from "../../store/slices/orders-slice"
import { Container } from "react-bootstrap"
import OrdersItem from "../../components/CS-order/CS-order"
import CoffeItemsPagination from "../../components/CS-pagination/CS-Pagination"
import { ContainerOfPagination } from "../Home/Home.style"

const OrderHistory = () => {
  const dispatch = useAppDispatch()
  const { orders }  = useAppSelector((state) => state.orders)
  console.log(orders)
  useEffect(() => {
    dispatch((getAllUserOrders()))
  }, [])
  const [currentPage, setCurrentPage] = useState(1);  
  const [recordsPerPage] = useState(2);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentPageListener = (enteredValue: number) => { 
    setCurrentPage(enteredValue);
  };
  return (
    <Container>
      <h2>Order History</h2>
      {orders.length > 0 &&
        orders.slice(indexOfFirstRecord, indexOfLastRecord).map((order) => (
          <OrdersItem key={order.id} order={order} isAdmin={false} />
        ))}
       {orders.length > 2 && <ContainerOfPagination>
        <CoffeItemsPagination
          nPages={Math.ceil(orders.length / recordsPerPage)}
          currentPage={currentPage}
          onCurrentPage={currentPageListener}
        />
      </ContainerOfPagination>}
    </Container>    
  )
  }
  
export default OrderHistory;