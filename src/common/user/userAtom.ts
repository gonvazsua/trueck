import {atom} from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();


export interface User {
    id: number;
    fullName: string;
    email: string;
    username: string;
}

export const userAtom = atom<User>({
    key: 'userState',
    default: {
        id: 0,
        fullName: '',
        email: '',
        username: '',
    },
    effects_UNSTABLE: [persistAtom],
});