import {atom} from "recoil";

interface LoginState {
    email: string;
    password: string;
}

export const loginAtom = atom<LoginState>({
    key: 'loginState',
    default: {
        email: '',
        password: '',
    },
});