import  {AxiosError} from 'axios';
import authService from './api.services/auth.service';
export const isAuth = (error: AxiosError) => {
    if (error.response?.status === 401) {
        authService.logout();
        window.location.reload();
    } 

}