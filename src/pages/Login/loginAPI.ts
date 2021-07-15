import {doFetch} from "../../api/doFetch";

const loginURL = 'http://localhost:8080/login';

export interface LoginResponse {
    token: string;
}

export const signInWithEmailAndPassword = async (email: string, password: string): Promise<LoginResponse> => {
    const body = {
        email: email,
        password: password
    };
    return new Promise<LoginResponse>((resolve, reject) => {
        doFetch(loginURL, { method: 'POST', body: JSON.stringify(body) })
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