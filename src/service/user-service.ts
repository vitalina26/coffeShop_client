import api from '../api';
import { User } from '../models/User';
import { UserUpdateDto } from '../dto/UserUpdateDto';
import { Token } from '../models/Token';

const getCurrentUser = async () => {
  const response = await api.get(
    `user/`
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
const updateCurrentUser = async (user_updated: UserUpdateDto) => {
    const response = await api.put(
      `user/`, user_updated
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