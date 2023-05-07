import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  axios from 'axios';
import { Order } from '../models/Order';
import orderService from '../service/order-service';
import isAuth from '../middleImport';
interface OrdersState  {
    orders: Order[] ;
}
const initialState: OrdersState = {
    orders: [], 
};

export const getAllOrders = createAsyncThunk(
    'orders/getAllOrders',
    async (_: void, thunkAPI) => {
        try {
            const response = await orderService.getAllOrders();
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                isAuth(error);
                return thunkAPI.rejectWithValue("");
            } else {
                return thunkAPI.rejectWithValue("");
            }
        }
    }
);
export const getAllUserOrders = createAsyncThunk(
    'orders/getAllUserOrders',
    async (_: void, thunkAPI) => {
        try {
            const response = await orderService.getAllUserOrders();
            return response;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                isAuth(error);
                return thunkAPI.rejectWithValue("");
            } else {
                return thunkAPI.rejectWithValue("");
            }
        }
    }
);
export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async (order_update: { id:string, stutus: string }, thunkAPI) => {
       try {
           const response = await orderService.updateOrderStatus(order_update.stutus,order_update.id);
        return response;
       } catch (error) {
        if (axios.isAxiosError(error)) {
            isAuth(error);
            return thunkAPI.rejectWithValue("");
          } else {
            return thunkAPI.rejectWithValue("");
          }
      }
    }
);

  export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
          reset: (state) => {
              state.orders = []
          },
      },
    extraReducers: (builder) => {
            builder
                  //getAllOrders
                  .addCase(getAllOrders.fulfilled, (state, action) => {
                      state.orders = action.payload;
                      console.log(action.payload);
                  })
                  .addCase(getAllOrders.rejected, (state) => {
                      state.orders = [];
                  })
                  //getAllUserOrders
                 .addCase(getAllUserOrders.fulfilled, (state, action) => {
                      state.orders = action.payload;
                      console.log(action.payload);
                  })
                  .addCase(getAllUserOrders.rejected, (state) => {
                      state.orders = [];
                  })
                //updateOrderStatus
                .addCase(updateOrderStatus.fulfilled, (state, action) => {
                    state.orders[state.orders.findIndex((obj)=> obj.id == action.payload.id)] = action.payload;
                })
           
          },
      });
  
  export default ordersSlice.reducer;