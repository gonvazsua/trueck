import {atom} from "recoil";

export interface LoginState {
    email: string;
    password: string;
    rememberMe: boolean;
    incorrectLogin: boolean;
    loggedIn: boolean;
}

export const loginAtom = atom<LoginState>({
    key: 'loginState',
    default: {
        email: localStorage.getItem('trueck-email') ? localStorage.getItem('trueck-email')+'' : '',
        password: localStorage.getItem('trueck-password') ? localStorage.getItem('trueck-password')+'' : '',
        incorrectLogin: false,
        rememberMe: localStorage.getItem('trueck-rememberMe') ? Boolean(localStorage.getItem('trueck-rememberMe')) : false,
        loggedIn: false,
    },
});