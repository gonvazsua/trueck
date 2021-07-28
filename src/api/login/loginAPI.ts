import {API_HOST_NAME} from "../url";
import axios, {AxiosResponse} from "axios";

export interface LoginResponse {
    token: string;
}

export const signInWithEmailAndPassword = async (email: string, password: string): Promise<AxiosResponse<LoginResponse>> => {
    const body = {
        email: email,
        password: password
    };
    return await axios.post<LoginResponse>(`${API_HOST_NAME}/login`, body)
};

export const signOut = async () => {
    return await new Promise<void>((resolve) => {
     resolve();
    });
}

export const signUp = async (fullName: string, username: string, email: string, password: string): Promise<AxiosResponse<void>> => {
    const body = {
        fullName, username, email, password
    };
    return await axios.post(`${API_HOST_NAME}/signUp`, body);
};