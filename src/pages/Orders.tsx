import React, { FC, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks"
import { getAllOrders } from "../slices/orders-slice"
import { Container } from "react-bootstrap"
import OrdersItem from "../components/CS-order/CS-order"
import { ContainerOfPagination } from "./Home"
import CoffeItemsPagination from "../components/CS-pagination/CS-Pagination"
const Orders: FC = () => {

  const dispatch = useAppDispatch()
  const { orders }  = useAppSelector((state) => state.orders)
  useEffect(() => {
    dispatch((getAllOrders()))
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
      <h2>Orders</h2>
      {orders.length > 0 &&
        orders.slice().sort(function (a, b) {
          const objB = new Date(b.date);
          const objA = new Date(a.date);
          return +objB - +objA;
        }).slice(indexOfFirstRecord, indexOfLastRecord).map((order) => (
          <OrdersItem key={order.id} order={order} isAdmin={true} />
        ))}
      {orders.length > 4 && <ContainerOfPagination>
        <CoffeItemsPagination
          nPages={Math.ceil(orders.length / recordsPerPage)}
          currentPage={currentPage}
          onCurrentPage={currentPageListener}
        />
      </ContainerOfPagination>}
    </Container>    
  )
  }
  
  export default Orders