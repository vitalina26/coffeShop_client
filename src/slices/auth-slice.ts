import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/User';
import { UserDto } from '../dto/UserDto';
import authService from '../service/auth.service';
import { LoginDto } from '../dto/LoginDto';
import { UserUpdateDto } from '../dto/UserUpdateDto';
import userService from '../service/user-service';
import api from '../api';



interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user: User | null;
  isAuthenticated: boolean;

}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const register = createAsyncThunk(
  'auth/register',
  async (user: UserDto, thunkAPI) => {
      try {
        console.log(user);
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to register!');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (user: LoginDto, thunkAPI) => {
    try {
      const response = await authService.login(user);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to login');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
   authService.logout();
});

export const checkAuthenticated = createAsyncThunk(
  'auth/checkAuthenticated',
  async (_:void, thunkAPI) => {
    try {
      const storedToken: string | null = localStorage.getItem('token');
      // eslint-disable-next-line no-extra-boolean-cast
      const token: string = !!storedToken ? storedToken : '';
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return await userService.getCurrentUser();
    }catch (error) {
      authService.logout();
      return thunkAPI.rejectWithValue('Unable to get');
    }
  }
);
export const editUser = createAsyncThunk(
    'auth/editUser',
    async (user_updated:UserUpdateDto, thunkAPI) => {
      try {
        const response = await userService.updateCurrentUser(user_updated);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue('Unable to update');
      }
    }
  );

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
      builder
          // REGISTER

          .addCase(register.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.user = action.payload;
          })
          .addCase(register.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
              state.user = null;
          })
          // LOGIN
          .addCase(login.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(login.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isAuthenticated = true;
              console.log(action.payload)
              state.user = action.payload;
          })
          .addCase(login.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
              state.isAuthenticated = false;
              state.user = null;
          })
          // LOGOUT
          .addCase(logout.fulfilled, (state) => {
              state.user = null;
              state.isAuthenticated = false;
             
          })
          // getCurrentUser
          .addCase(checkAuthenticated.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(checkAuthenticated.fulfilled, (state,action) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isAuthenticated = true;
              console.log(action.payload)
              state.user = action.payload;
          })
          .addCase(checkAuthenticated.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
              state.isAuthenticated = false ;
       
          })
          // editUser
          .addCase(editUser.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = action.payload;
          })
          .addCase(editUser.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
              state.isAuthenticated = false;
          });
  },
});

export const { reset } = authSlice.actions;



export default authSlice.reducer;