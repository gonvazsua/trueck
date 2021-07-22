import {API_HOST_NAME} from "../url";
import axios, {AxiosResponse} from "axios";
const Cookies = require('js-cookie');

export interface LoginResponse {
    token: string;
}

export const signInWithEmailAndPassword = async (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
    const body = {
        email: email,
        password: password
    };
    const config = {
        headers: {
            'XSRF-TOKEN': Cookies.set('XSRF-TOKEN'),
        }
    }
    return await axios.post<LoginResponse>(`${API_HOST_NAME}/login`, body, config)
};

export const signOut = async () => {
    return await new Promise<void>((resolve) => {
     resolve();
    });
}