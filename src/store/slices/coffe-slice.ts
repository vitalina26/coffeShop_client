import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Coffe } from '../../models/Coffe';
import { CoffeUpdateDto } from '../../dto/CoffeUpdateDto';
import coffeService from '../../service/api.services/coffe.service';
import { CoffeDto } from '../../dto/CoffeDto';
import  axios, {AxiosError} from 'axios';
import { isAuth } from '../../service/defineKindOfError';
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
        processingType: '',
        img_url: ''
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
    'coffe/getCoffe',
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
    name: 'coffe',
    initialState,
    reducers: {
      resetCoffe: (state) => {
        state.coffe =  {
            id: '',
            name: '',
            price: 0,
            description: '',
            beansClass: '',
            cookingMethod:'',
            degreeOfRoasting:'',
            country:'',
            processingType: '',
            img_url: ''
        };
      },},
    extraReducers: (builder) => {
        builder
            //createCoffe
            .addCase(createCoffe.fulfilled, (state,action) => {
                state.coffe = action.payload;
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
                    processingType: '',
                    img_url: ''
                };
            })
            .addCase(getCoffe.fulfilled, (state,action) => {
              state.coffe = action.payload;
          })
           
    },
  });
 export const {
     resetCoffe
    } = coffeSlice.actions;
    export default coffeSlice.reducer;