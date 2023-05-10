import { UserDto } from '../../dto/UserDto';
import { LoginDto } from '../../dto/LoginDto';
import { User } from '../../models/User';
import userService from './user.service'
import api from '../api';

const register = async (newUser: UserDto) => {
  console.log( newUser);
  const response = await api.post(
    `auth/register`,
    newUser
  );
  console.log( newUser);

  return response.data;
};

const login = async (
  user: LoginDto
) => {
  console.log(user)
  const response = await api.post(
    `auth/login`,
    user
  );

  if (response.data) {
    console.log(response);
    localStorage.setItem('token',response.data.token);
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    const user_db: User = await userService.getCurrentUser();
    console.log(user_db);
    return  user_db;
  }
  return  null;
};

const logout = (): void => {
  localStorage.removeItem('cart');
  localStorage.removeItem('token');
  localStorage.removeItem('counter');
  delete api.defaults.headers.Authorization;
};
/*const getCurrentUser = (user_id: string): boolean => {
  let isAuth = true;
  api.get(
    `user/${user_id}`
  ).catch((error: AxiosError) => {
    if (error.response?.status === 401) {
      isAuth = false;
      logout();
    } else {
      throw error;
    }
  });
  return isAuth;
}*/

const authService = {
  register,
  login,
  logout,
};

export default authService;