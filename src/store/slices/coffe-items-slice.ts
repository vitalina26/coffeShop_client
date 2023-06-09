import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Coffe } from '../../models/Coffe';
import coffeService from '../../service/api.services/coffe.service';
import  axios, {AxiosError} from 'axios';
interface CoffeItemsState  {
    allCoffes: Coffe[] ;
  }
const initialState: CoffeItemsState = {
    allCoffes: [], 
};
export const getAllCoffes = createAsyncThunk(
    'coffe/getAllCoffes',
    async (_:void, thunkAPI) => {
      try {
        const response = await coffeService.getAllCoffes();
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log(error)
          return thunkAPI.rejectWithValue("");
        } 
        return thunkAPI.rejectWithValue('Unable to update');
      }
    }
);


  export const coffesSlice = createSlice({
    name: 'coffe-items',
    initialState,
    reducers: {},
    extraReducers: (builder) => { 
        builder
            //getAllCoffes
            .addCase(getAllCoffes.fulfilled, (state,action) => {
              state.allCoffes = action.payload;
              console.log(action.payload);
            })
            .addCase(getAllCoffes.rejected, (state) => {
              state.allCoffes = [];
            })
           
    },
  });
  export default coffesSlice.reducer;