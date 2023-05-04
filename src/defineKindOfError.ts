import  {AxiosError} from 'axios';
import authService from './service/auth.service';
import { logout } from "./slices/auth-slice"
export const isAuth = (error: AxiosError) => {
    if (error.response?.status === 401) {
        authService.logout();
        window.location.reload();
    } 

}