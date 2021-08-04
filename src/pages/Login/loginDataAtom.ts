import {atom} from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface LoginState {
    email: string;
    password: string;
    incorrectLogin: boolean;
}

export const loginDataAtom = atom<LoginState>({
    key: 'loginState',
    default: {
        email: '',
        password: '',
        incorrectLogin: false,
    },
    effects_UNSTABLE: [persistAtom],
});

export const loginStatusAtom = atom<Boolean>({
    key: 'loginStatusState',
    default: false
});