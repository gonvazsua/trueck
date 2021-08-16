import {atom} from "recoil";
import {Dress} from "../../api/dress/dressAPI";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const shoppingCartAtom = atom<Dress[]>({
    key: 'shoppingCartState',
    default: [],
    effects_UNSTABLE: [persistAtom],
});