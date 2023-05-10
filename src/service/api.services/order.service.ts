import api from '../api';
import { OrderDto } from '../../dto/OrderDto';
import { Order } from '../../models/Order';

const updateOrderStatus = async (status: string, id: string) => {
      const response = await api.put(
            `order/${id}`, { status: status }
      );
      const order: Order = response.data;
      return order;
}
  
const getAllOrders = async () => {
      const response = await api.get(
       `order/all`,
      );
      console.log(response)
      const orders: Order[] = response.data;
      return orders;
}
const getAllUserOrders = async () => {
    const response = await api.get(
     `order/user/all`,
    );
    console.log(response)
    const orders: Order[] = response.data;
    return orders;
}
   
const createOrder = async (orderDto: OrderDto) => {
      const response = await api.post(
        `order/`, orderDto
      );
      return response.data;
}
    
  
const orderService = {
    getAllOrders,
    updateOrderStatus,
    createOrder,
    getAllUserOrders
  };
  
  export default orderService;