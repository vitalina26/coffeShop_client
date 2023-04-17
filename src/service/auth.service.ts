import axios from 'axios';
import { UserDto } from '../dto/UserDto';
import { LoginDto } from '../dto/LoginDto';
import { User } from '../models/User';
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

    const user_db: User = await getCurrentUser(response.data.user_id);
    localStorage.setItem('user', JSON.stringify(user_db));
    return { jwt:{ token: response.data.token }, user: user_db };
  }
  return { jwt: { token: response.data.token }, user: null };
};

const getCurrentUser = async (id: string) => {
  const response = await axios.get(
    `${base_url}user/${id}`
  );
  const user:User = {
    id: response.data.id,
    firstname: response.data.firstname,
    secondname: response.data.secondname,
    email: response.data.email,
    role: response.data.role,
    phonenumber: response.data.phonenumber,
  }
  return user;
}
const logout = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('jwt');
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