import {atom} from "recoil";


export interface User {
    id: number;
    name: string;
}

export const userAtom = atom<User>({
    key: 'userState',
    default: {
        id: 0,
        name: ''
    },
});