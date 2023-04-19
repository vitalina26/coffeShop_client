import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../models/User';
import { Jwt } from '../models/Jwt';
import { UserDto } from '../dto/UserDto';
import authService from '../service/auth.service';
import { LoginDto } from '../dto/LoginDto';
import { RootState } from '../store';
import { UserUpdateDto } from '../dto/UserUpdateDto';
import userService from '../service/user-service';

const storedUser: string | null = localStorage.getItem('user');
// eslint-disable-next-line no-extra-boolean-cast
const user: User | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem('jwt');
// eslint-disable-next-line no-extra-boolean-cast
const jwt: Jwt = !!storedJwt ? JSON.parse(storedJwt) : null;


interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface AuthState extends AsyncState {
  user?: User | null;
  jwt?: Jwt | null;
  isAuthenticated?: boolean;
  isVerifed?: boolean;
}

const initialState: AuthState = {
  user: user,
  jwt: jwt,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
  isVerifed: false,
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
        console.log(user);
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to login');
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
   authService.logout();
});

export const verifyJwt = createAsyncThunk(
  'auth/verify-jwt',
  async (jwt: string, thunkAPI) => {
    try {
      return await authService.verifyJwt(jwt);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to verify');
    }
  }
);
export const editUser = createAsyncThunk(
    'auth/editUser',
    async (user_updated:UserUpdateDto, thunkAPI) => {
      try {
        console.log(user_updated)
        const response = await userService.updateCurrentUser(user_updated, jwt);
        localStorage.setItem('user', JSON.stringify(response));
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
              state.jwt = action.payload.jwt;
              state.isAuthenticated = true;
              state.user = action.payload.user;
          })
          .addCase(login.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
              state.user = null;
              state.isAuthenticated = false;
              state.user = null;
          })
          // LOGOUT
          .addCase(logout.fulfilled, (state) => {
              state.user = null;
              state.jwt = null;
              state.isAuthenticated = false;
          })
          // VERIFY JWT
          .addCase(verifyJwt.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(verifyJwt.fulfilled, (state) => {
              state.isLoading = false;
              state.isSuccess = true;
              state.isAuthenticated = true;
              state.isVerifed = true;
          })
          .addCase(verifyJwt.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
              state.isAuthenticated = false;
              state.isVerifed = false;
          })
          // editUser
          .addCase(editUser.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(editUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action.payload)
            state.user = action.payload;
            console.log(state.user)
  
          })
          .addCase(editUser.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
          });
  },
});

export const { reset } = authSlice.actions;



export default authSlice.reducer;