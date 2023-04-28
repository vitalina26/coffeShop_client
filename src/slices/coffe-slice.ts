import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Coffe } from '../models/Coffe';
import { CoffeUpdateDto } from '../dto/CoffeUpdateDto';
import coffeService from '../service/coffe-service';
import { CoffeDto } from '../dto/CoffeDto';
import  axios, {AxiosError} from 'axios';
//import { isAuth } from '../defineKindOfError';
import  isAuth  from '../middleImport';
interface CoffeState  {
    coffe: Coffe;
  }
const initialState: CoffeState = {
    coffe: {
        id: '',
        name: '',
        price: 0,
        description: '',
        beansClass: '',
        cookingMethod:'',
        degreeOfRoasting:'',
        country:'',
        processingType:'',
    }, 
};

export const editCoffe = createAsyncThunk(
    'coffe/editCoffe',
    async (coffe: CoffeUpdateDto & {id: string}, thunkAPI) => {
       try {
           const { id, ...coffe_updated } = coffe;
           const response = await coffeService.updateCoffe(coffe_updated, id);
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
export const createCoffe = createAsyncThunk(
    'coffe/createCoffe',
    async (coffe: CoffeDto, thunkAPI) => {
       try {
           const response = await coffeService.createCoffe(coffe);
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
export const deleteCoffe = createAsyncThunk(
    'coffe/deleteCoffe',
    async (id: string, thunkAPI) => {
       try {
           await coffeService.deleteCoffe(id);
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
export const getCoffe = createAsyncThunk(
    'coffe/createCoffe',
    async (id: string, thunkAPI) => {
       try {
           const response = await coffeService.getCoffe(id);
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
  export const coffeSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {reset: (state) => {
        state.coffe =  {
            id: '',
            name: '',
            price: 0,
            description: '',
            beansClass: '',
            cookingMethod:'',
            degreeOfRoasting:'',
            country:'',
            processingType:'',
        };
      },},
    extraReducers: (builder) => {
        builder
            //createCoffe
            .addCase(createCoffe.fulfilled, (state,action) => {
                state.coffe = action.payload;
            })
            .addCase(createCoffe.rejected, (state) => {
                state.coffe = {
                    id: '',
                    name: '',
                    price: 0,
                    description: '',
                    beansClass: '',
                    cookingMethod:'',
                    degreeOfRoasting:'',
                    country:'',
                    processingType:'',
                };
            })
            //editCoffe
            .addCase(editCoffe.fulfilled, (state,action) => {
                state.coffe = action.payload;
            })
             //deleteCoffe
            .addCase(deleteCoffe.fulfilled, (state) => {
                state.coffe = {
                    id: '',
                    name: '',
                    price: 0,
                    description: '',
                    beansClass: '',
                    cookingMethod:'',
                    degreeOfRoasting:'',
                    country:'',
                    processingType:'',
                };
            })
        
           
    },
  });
   // state.allCoffes[state.allCoffes.findIndex((item => item.id === action.payload.id))] = action.payload;
    //state.allCoffes = state.allCoffes.filter(item => item.id !== action.payload)

    export default coffeSlice.reducer;