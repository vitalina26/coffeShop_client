import axios from 'axios';
import { UserDto } from '../dto/UserDto';
import { LoginDto } from '../dto/LoginDto';
import { User } from '../models/User';
import  userService  from './user-service'
const base_url = 'http://localhost:3000/';
const register = async (newUser: UserDto) => {
  console.log( newUser);
  const response = await axios.post(
    `${base_url}auth/register`,
    newUser
  );
  console.log( newUser);

  return response.data;
};

const login = async (
  user: LoginDto
) => {
  console.log(user)
  const response = await axios.post(
    `${base_url}auth/login`,
    user
  );

  if (response.data) {
    localStorage.setItem('jwt', JSON.stringify({ token: response.data.token }));
    console.log(response.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    console.log(response)
    const user_db: User = await userService.getCurrentUser(response.data.user_id);
    localStorage.setItem('user', JSON.stringify(user_db));
    return { jwt:{ token: response.data.token }, user: user_db };
  }
  return { jwt: { token: response.data.token }, user: null };
};

const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
  axios.defaults.headers.common['Authorization'] = `Bearer`;
};

const verifyJwt = async (jwt: string): Promise<boolean> => {
  const response = await axios.post(
    `${base_url}auth/verify-jwt`,
    { jwt }
  );

  if (response.data) {
    const jwtExpirationMs = response.data.exp * 1000;
    return jwtExpirationMs > Date.now();
  }

  return false;
};

const authService = {
  register,
  login,
  logout,
  verifyJwt,
};

export default authService;