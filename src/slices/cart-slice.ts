import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  axios from 'axios';
import orderService from '../service/order-service';
import isAuth from '../middleImport';
import { CoffeIdAndQuantity, OrderDto } from '../dto/OrderDto';
import { current } from '@reduxjs/toolkit'
interface CartState  {
    items: CoffeIdAndQuantity[] ;
}
const initialState: CartState = {
    items: [], 
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
        localStorage.setItem("cart", JSON.stringify(state.items));
        },
      addToCart: (state, action) => {
        console.log(current(state.items))
            const index = state.items.findIndex((item) => item.coffe_id == action.payload);
            if (index !== -1) {
              state.items[index].quantity++;
            } else {
              state.items.push({ coffe_id: action.payload, quantity: 1 });
          }
         console.log(current(state.items))
         localStorage.setItem("cart", JSON.stringify(state.items));
        },
      incrementQuantity: (state, action) => {
          const index = state.items.findIndex((item) => item.coffe_id === action.payload);
          if (index !== -1) {
            state.items[index].quantity++;
            localStorage.setItem("cart", JSON.stringify(state.items));
          }
         
        },
      decrementQuantity: (state, action) => {
            const index = state.items.findIndex((item) => item.coffe_id === action.payload);
          if (index !== -1) {
              if ( state.items[index].quantity === 1) {
                state.items[index].quantity = 1
              } else {
                state.items[index].quantity--;
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
            }  
          },
      removeItem: (state, action) => {
            const removeItem = state.items.filter((item) => item.coffe_id !== action.payload);
            state.items = removeItem;
            localStorage.setItem("cart", JSON.stringify(state.items));
          },
      getItems: (state) => {
            const storedCart: string | null = localStorage.getItem('cart');
            // eslint-disable-next-line no-extra-boolean-cast
            const cart: string = !!storedCart ? storedCart : '';
            if (cart !== '') {
              state.items = JSON.parse(cart);
            }
          },
      },
    extraReducers: (builder) => {
            builder
                  //createOrder
                  .addCase(createOrder.fulfilled, (state, action) => {
                    state.items = [];
                    localStorage.removeItem('cart');
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