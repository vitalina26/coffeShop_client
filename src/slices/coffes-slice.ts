import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Coffe } from '../models/Coffe';
import coffeService from '../service/coffe-service';

interface CoffeState  {
    allCoffes: Coffe[] ;
  }
const initialState: CoffeState = {
    allCoffes: [], 
};
export const getAllCoffes = createAsyncThunk(
    'coffe/getAllCoffes',
    async (_:void, thunkAPI) => {
      try {
        const response = await coffeService.getAllCoffes();
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue('Unable to update');
      }
    }
);


  export const coffesSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //getAllCoffes
            .addCase(getAllCoffes.fulfilled, (state,action) => {
                state.allCoffes = action.payload;
            })
            .addCase(getAllCoffes.rejected, (state) => {
              state.allCoffes = [];
            })
           
    },
  });
  export default coffesSlice.reducer;