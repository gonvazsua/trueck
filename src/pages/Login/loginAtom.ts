import {atom} from "recoil";

interface LoginState {
    email: string;
    password: string;
    incorrectLogin: boolean;
}

export const loginAtom = atom<LoginState>({
    key: 'loginState',
    default: {
        email: '',
        password: '',
        incorrectLogin: false,
    },
});