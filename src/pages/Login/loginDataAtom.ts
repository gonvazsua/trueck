import {atom} from "recoil";

export interface LoginState {
    email: string;
    password: string;
    incorrectLogin: boolean;
}

export const loginDataAtom = atom<LoginState>({
    key: 'loginState',
    default: {
        email: localStorage.getItem('trueck-email') ? localStorage.getItem('trueck-email')+'' : '',
        password: localStorage.getItem('trueck-password') ? localStorage.getItem('trueck-password')+'' : '',
        incorrectLogin: false,
    },
});

export const loginStatusAtom = atom<Boolean>({
    key: 'loginStatusState',
    default: false
});