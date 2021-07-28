import {atom} from "recoil";


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
});