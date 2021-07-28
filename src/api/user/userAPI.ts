import {User} from "../../common/user/userAtom";
import {API_HOST_NAME} from "../url";
import axios, {AxiosResponse} from "axios";
const Cookies = require('js-cookie');

export interface UserResponse {
    users: User[];
};


export const getLoggedUser = async (): Promise<AxiosResponse<User>> => {
    const config = {
        headers: {
            'XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
        }
    }
    return await axios.get<User>(`${API_HOST_NAME}/loggedUser`, config);
}

export const findByUsername = async (username: string): Promise<AxiosResponse<UserResponse>> => {
    return await axios.get<UserResponse>(`${API_HOST_NAME}/users?username=${username}`);
};