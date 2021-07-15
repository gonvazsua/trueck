import {atom} from "recoil";

interface LoginState {
    email: string;
    password: string;
    rememberMe: boolean;
    incorrectLogin: boolean;
}

export const loginAtom = atom<LoginState>({
    key: 'loginState',
    default: {
        email: '',
        password: '',
        incorrectLogin: false,
        rememberMe: false,
    },
});