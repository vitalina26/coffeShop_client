import axios from 'axios';
import { User } from '../models/User';
import { UserUpdateDto } from '../dto/UserUpdateDto';
const base_url = 'http://localhost:3000/';

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
const updateCurrentUser = async (user_updated:UserUpdateDto) => {
    const response = await axios.put(
      `${base_url}user/`,user_updated
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


const userService = {
    getCurrentUser,
    updateCurrentUser
};

export default userService;