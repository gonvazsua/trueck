import {doFetch} from "../../api/doFetch";
import {API_HOST_NAME} from "../../api/url";

export interface LoginResponse {
    token: string;
}

export const signInWithEmailAndPassword = async (email: string, password: string): Promise<LoginResponse> => {
    const body = {
        email: email,
        password: password
    };
    return new Promise<LoginResponse>((resolve, reject) => {
        doFetch(`${API_HOST_NAME}/login`, { method: 'POST', body: JSON.stringify(body) })
            .then((response: Response) => {
                if(!response.ok) {
                    reject('');
                }
                resolve(response.json());
            })
    });
};

export const signOut = async () => {
    return await new Promise<void>((resolve) => {
     resolve();
    });
}