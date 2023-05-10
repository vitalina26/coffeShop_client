import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  axios from 'axios';
import orderService from '../../service/api.services/order.service';
import isAuth from '../../middleImport';
import { CoffeIdAndQuantity, OrderDto } from '../../dto/OrderDto';
import { current } from '@reduxjs/toolkit'
interface CartState  {
  items: CoffeIdAndQuantity[];
  counter: number;
}
const initialState: CartState = {
  items: [], 
  counter: 0,
};

export const createOrder= createAsyncThunk(
    'orders/createOrder',
    async (orderDto: OrderDto, thunkAPI) => {
       try {
           const response = await orderService.createOrder(orderDto);
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


  export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      resetCart: (state) => {
        state.items = []
        state.counter = 0;
        localStorage.setItem("counter", JSON.stringify(state.counter));
        localStorage.setItem("cart", JSON.stringify(state.items));
        },
      addToCart: (state, action) => {
        const index = state.items.findIndex((item) => item.coffe_id == action.payload.coffe_id);
        if (index !== -1) {
          state.items[index].quantity++;
        } else {
           state.items.push({ coffe_id: action.payload.coffe_id, quantity: 1 });
        }
        state.counter = state.counter + action.payload.price;
        localStorage.setItem("counter", JSON.stringify(state.counter));
        localStorage.setItem("cart", JSON.stringify(state.items));
        },
      incrementQuantity: (state, action) => {
        const index = state.items.findIndex((item) => item.coffe_id === action.payload.coffe_id);
        if (index !== -1) {
          state.items[index].quantity++;
          state.counter = state.counter + action.payload.price;
          localStorage.setItem("counter", JSON.stringify(state.counter));
          localStorage.setItem("cart", JSON.stringify(state.items));
        }
         
        },
      decrementQuantity: (state, action) => {
            const index = state.items.findIndex((item) => item.coffe_id === action.payload.coffe_id);
          if (index !== -1) {
              if ( state.items[index].quantity === 1) {
                state.items[index].quantity = 1
              } else {
                state.items[index].quantity--;
                state.counter = state.counter - action.payload.price;
                localStorage.setItem("counter", JSON.stringify(state.counter));
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
            }  
          },
      removeItem: (state, action) => {
        const removeItem = state.items.filter((item) => item.coffe_id !== action.payload.coffe_id);
        state.items = removeItem;
        state.counter = state.counter - action.payload.price
        localStorage.setItem("counter", JSON.stringify(state.counter)); 
        localStorage.setItem("cart", JSON.stringify(state.items));
        
          },
      getItems: (state) => {
        const storedCart: string | null = localStorage.getItem('cart');
            // eslint-disable-next-line no-extra-boolean-cast
        const cart: string = !!storedCart ? storedCart : '';
        const storedCounter: string | null = localStorage.getItem('counter');
        // eslint-disable-next-line no-extra-boolean-cast
        const counter: string = !!storedCounter ? storedCounter : '';
            if (cart !== '' && counter !== '') {
              state.items = JSON.parse(cart);
              state.counter = parseInt(counter);
            }
          },
      },
    extraReducers: (builder) => {
            builder
                  //createOrder
                  .addCase(createOrder.fulfilled, (state) => {
                    state.items = [];
                    state.counter = 0;
                    localStorage.removeItem('cart');
                    localStorage.removeItem('counter');
                  })
          },
      });


export const {
    resetCart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    getItems
} = cartSlice.actions;

export default cartSlice.reducer;